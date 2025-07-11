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
        res.sendStatus(400)

        return
    }

    const [schema, token] = authorization.split(" ")

    try {
        const decoded = jwt.verify(token, secretKey)

        req.usuario = decoded
            
        next()

    } catch (error) {
        res.status(401).send({
          error: error
        })

        return
    }
}