import { Router } from "express";
import { createProdutoController, deleteProdutoController, fetchProdutoController, updateProdutoController } from "../controllers/produtoController";
import { authMiddleware } from "../middleware/authMiddleware";

const produtoRouter = Router()

produtoRouter.post('/create', authMiddleware, createProdutoController)
produtoRouter.put('/update', authMiddleware, updateProdutoController)
produtoRouter.get('/fetch', authMiddleware, fetchProdutoController)
produtoRouter.delete('/delete/:id', authMiddleware, deleteProdutoController)

export default produtoRouter