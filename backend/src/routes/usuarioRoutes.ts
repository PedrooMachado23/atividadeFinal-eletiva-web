import { Router } from "express";
import { blockUsuarioController, createUsuarioController, loginUsuarioController, updateUsarioPsswdController, verifyTokenUserController } from "../controllers/usuarioController";
import { authMiddleware} from "../middleware/authMiddleware";
import { isAdmin } from "../middleware/isAdminMiddleware";

const usuarioRouter = Router()

usuarioRouter.post('/create', authMiddleware, isAdmin, createUsuarioController)
usuarioRouter.post('/auth', loginUsuarioController)
usuarioRouter.post('/verifyToken', authMiddleware, verifyTokenUserController)
usuarioRouter.put('/updatePsswd', authMiddleware, updateUsarioPsswdController)
usuarioRouter.put('/block/:username', blockUsuarioController)

export default usuarioRouter