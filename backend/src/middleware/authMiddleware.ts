import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

//evita verify duplo no caso de chamar os dois middleware
declare module 'express-serve-static-core' {
  interface Request {
    usuario?: any
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
    const { authorization } = req.headers

    const secretKey = process.env.JWT_PSSWD || ''

    if (!authorization){
        res.sendStatus(401)

        return
    }

    const [schema, token] = authorization.split(" ")

    try {
        const decoded = jwt.verify(token, secretKey)

        req.usuario = decoded
            
        next()

    } catch (error) {
        res.sendStatus(401)

        return
    }
}

export async function isAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { permission } = req.usuario.permission

    if (permission === "0") {
        next()

    } else {
        res.sendStatus(403)
    }
}