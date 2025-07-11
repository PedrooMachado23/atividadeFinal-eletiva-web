import { Request, Response } from "express";
import { createProdutoService, deleteProdutoService, fetchProdutoService, updateProdutoService } from "../services/produtoServices";
import { produto } from "../generated/prisma";


export async function createProdutoController(req:Request, res: Response): Promise<void> {
    const data: produto = req.body

    try {
        const createdProduto = await createProdutoService(data)

        res.status(201).send({
            message: "Produto criado!",
            product: createdProduto
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
    const codeProduto = req.params.code

    try {
        await deleteProdutoService(codeProduto)

        res.status(200).send({
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
            products: foundProdutos
        })

    } catch (error) {
        console.log(`Erro ao listar todos os usuarios ${error}`)
        
        res.status(500).send({
            message: "Erro ao listar todos os usuários"
        })
    }
}