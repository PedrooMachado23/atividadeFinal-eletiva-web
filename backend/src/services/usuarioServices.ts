import { usuario } from "../../generated/prisma";
import { hashPsswd, verifyHash } from "../utils/hashFunctions";
import { prisma } from "../utils/prismaClient";

export async function getUsuarioByUsername(existingUsername:string): Promise<usuario | undefined> {
    const user = await prisma.usuario.findUnique({
        where: {
            username:  existingUsername
        }
    })

    if (user) {
        return user
    }
}

export async function createUsuarioService(newUserData: usuario): Promise<Partial<usuario>> {
    const existingUsuario = await getUsuarioByUsername(newUserData.username)

    if (existingUsuario) {
        throw new Error('Usuário já existe')
    }

    newUserData.password = await hashPsswd(newUserData.password)

    const createdUsuario = await prisma.usuario.create({
        data: newUserData,
        select: {
            username: true,
            nome: true
        }
    })

    return createdUsuario
}

export async function updateUsuarioPsswd(username: string, newPsswd: string): Promise<void> {
    const newPsswdHash = await hashPsswd(newPsswd)

    await prisma.usuario.update({
        where: {
            username: username
        },
        data: {
            password: newPsswdHash,
            status: "A"
        }
    })

    return
}

export async function blockUsuarioService(username: string): Promise<void> {
    await prisma.usuario.update({
        data: {
            status: "B"
        },
        where: {
            username: username
        }
    })
}

export async function deleteUsuarioService(usernameToDelete: string): Promise<void> {
    await prisma.usuario.delete({where: {
            username: usernameToDelete
        }})

    return
}