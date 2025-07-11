import { usuario } from "../../generated/prisma"
import { Request, Response, NextFunction } from "express"

export async function isAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
    const tipo = req.usuario.tipo

    if (tipo === "0") {
        next()

    } else {
        res.sendStatus(403)
    }
}