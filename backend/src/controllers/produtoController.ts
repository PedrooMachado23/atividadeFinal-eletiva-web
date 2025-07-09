import { Request, Response } from "express";
import { produto } from "../../generated/prisma";
import { createProdutoService, deleteProdutoService, fetchProdutoService, updateProdutoService } from "../services/produtoServices";


export async function createProdutoController(req:Request, res: Response): Promise<void> {
    const data: produto = req.body

    try {
        const createdProduto = await createProdutoService(data)

        res.status(201).send({
            message: "Produto criado!",
            data: createdProduto
        })

    } catch (error) {
        console.log(`Erro ao cadastrar produto ${error}`)

        res.status(500).send({
            error: "Erro ao criar produto"
        })
    }
}

export async function updateProdutoController(req:Request, res: Response): Promise<void> {
    const data: produto = req.body

    try {
        const updatedProduto = await updateProdutoService(data)

        res.status(200).send({
            message: "Produto Atualizado com sucesso"
        })

    } catch (error) {
        console.log(`Erro ao atualizar produto ${error}`)

        res.status(500).send({
            error: "Erro ao atualizar o produto"
        })
    }
}

export async function deleteProdutoController(req:Request, res: Response): Promise<void> {
    const idProduto = req.params.id

    try {
        await deleteProdutoService(Number(idProduto))

        res.status(500).send({
            message: "Usuario deletado com sucesso"
        })
        
    } catch (error) {
        console.log(`Erro ao deletar produto ${error}`)

        res.status(500).send({
            error: "Erro ao deletar o produto"
        })
    }
}

export async function fetchProdutoController(req:Request, res: Response): Promise<void> {
    try {
        const foundProdutos = await fetchProdutoService()

        res.status(200).send({
            message: "Listagem de todos os produtos",
            data: foundProdutos
        })

    } catch (error) {
        console.log(`Erro ao listar todos os usuarios ${error}`)
        
        res.status(500).send({
            message: "Erro ao listar todos os usuários"
        })
    }
}