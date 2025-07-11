import { produto } from "../generated/prisma";
import { prisma } from "../utils/prismaClient";

async function getProdutoById(codProduto: string): Promise<produto | undefined> {
    const produto = await prisma.produto.findUnique({
        where: {
            codigo: codProduto
        }
    })

    if (produto) {
        return produto
    }
}

export async function createProdutoService(newProdutoData: produto): Promise<Partial<produto>> {
    const existingProduto = await getProdutoById(newProdutoData.codigo)

    if (existingProduto) {
        throw new Error("Produto já cadastrado")
    }

    const createdProduto = await prisma.produto.create({
        data: newProdutoData,
        select: {
            codigo: true,
            nome: true
        }
    })

    return createdProduto
}

export async function updateProdutoService(updatedData: produto): Promise<void> {
    const updatedProduto = await prisma.produto.update({
        where: {
            codigo: updatedData.codigo
        },
        data: updatedData
    })

    return
}

export async function deleteProdutoService(codeProduto: string): Promise<void> {
    await prisma.produto.delete({
        where: {
            codigo: codeProduto
        }
    })

    return
}

export async function fetchProdutoService(): Promise<Array<produto>> {
    const foundProdutos = await prisma.produto.findMany()

    return foundProdutos
}