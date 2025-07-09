import { Router } from "express";
import { blockUsuarioController, createUsuarioController, deleteUsuarioController, loginUsuarioController, updateUsarioPsswdController } from "../controllers/usuarioController";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware";

const usuarioRouter = Router()

usuarioRouter.post('/create', authMiddleware, isAdmin, createUsuarioController)
usuarioRouter.post('/auth', loginUsuarioController)
usuarioRouter.put('/updatePsswd', authMiddleware, updateUsarioPsswdController)
usuarioRouter.put('/block/:username', blockUsuarioController)
usuarioRouter.delete('/delete/:username', authMiddleware, isAdmin, deleteUsuarioController)

export default usuarioRouter