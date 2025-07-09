import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

export function generateToken(username:string, isAdmin: string): string {
    const secretKey = process.env.JWT_PSSWD || ''

    const token = jwt.sign({username: username, permission: isAdmin}, secretKey, {expiresIn: '30m'})

    return token
}

export function verifyToken(token: string) {
    const secretKey = process.env.JWT_PSSWD || ''

    const decod = jwt.verify(token, secretKey)

    return decod
}