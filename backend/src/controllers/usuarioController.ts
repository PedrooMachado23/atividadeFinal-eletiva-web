import { Request, Response } from "express";
import { createUsuarioService, getUsuarioByUsername, blockUsuarioService, updateUsuarioPsswd } from "../services/usuarioServices";
import { verifyHash } from "../utils/hashFunctions";
import { generateToken } from "../utils/tokenFunctions";
import { prisma } from "../utils/prismaClient";
import { usuario } from "../generated/prisma";

export async function createUsuarioController(req: Request, res: Response): Promise<void> {
    const data: usuario = req.body

    try {
        const createdUsuario = await createUsuarioService(data)

        res.status(201).send({
        message: "Usuario criado!",
        data: createdUsuario
    })

    return

    } catch (error) {
        console.log(error)

        res.status(500).send({
            error: "Erro ao criar usuário",
        })
    }
}

export async function loginUsuarioController(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body

    try {
        const existingUsuario = await getUsuarioByUsername(username)

        if (!existingUsuario) {
            res.status(400).send({
                message: "Usuário não existe"
            })

            return
        }

        if (existingUsuario.status === "B") {
            res.status(401).send({
                message: "Sua conta foi bloqueada."
            })

            return
        }

        const match = await verifyHash(password, existingUsuario.password)

        await prisma.usuario.update({
            data: {
                quantacesso: {
                    increment: 1
                }
            },
            where: {
                username: username
            }
        })

        if (!match){
            res.status(401).send({
                message: "Usuario ou senha inválidos."
            })

            return
        }

        const token = generateToken(username, existingUsuario.nome, existingUsuario.tipo)
        

        res.status(200).send({
            message: "Ok",
            token: token
        })

        return

    } catch (error) {
        console.log(error)

        res.status(500).send({
            error: "Erro ao fazer login"
        })
    }
}

export function verifyTokenUserController(req: Request, res: Response): void {
    res.status(200).send({
        message: 'token verificado'
    })
}

export async function updateUsarioPsswdController(req: Request, res: Response): Promise<void> {
    const { username, typedPsswd, newPsswd } = req.body

    try {
        const existingUsuario = await getUsuarioByUsername(username)

        if (!existingUsuario) {
            res.status(400).send({
                error: "Usuario nao encontrado"
            })

            return 
        }

        const match = await verifyHash(typedPsswd, existingUsuario.password)

        if (!match) {
            res.status(401).send({
                error: 'A senha digitada está incorreta'
            })

            return
        }

        await updateUsuarioPsswd(username, newPsswd)

        res.status(200).send({
            message: "Senha atualizada com sucesso!"
        })

    } catch (error) {
        console.log(error)

        res.status(500).send({
            error: "Erro ao atualizar a senha"
        })
    }
}

export async function blockUsuarioController(req: Request, res:Response): Promise<void> {
    const username = req.params.username

    try {
        await blockUsuarioService(username)

        res.status(200).send({
            message: 'Conta bloqueada por tentativas excessivas'
        })
        
    } catch (error) {
        console.log(error)

        res.status(500).send({
            message: "Erro ao bloquear Usuário"
        })
    }
}