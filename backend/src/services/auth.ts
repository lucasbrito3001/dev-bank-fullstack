import { NextFunction, Response } from 'express'
import { Request } from 'express-jwt'
import { sign, verify } from 'jsonwebtoken'
import { IAuthService } from 'src/interfaces/auth.interface'
import { HTTP_STATUS_CODE } from './constants'

function generateJWT(
    idUser: string,
    email: string,
    secret: string | undefined = process.env.JWT_SECRET,
    jwtCreator = sign
): IAuthService {
    try {
        if(!secret) throw new Error('JWT Secret is missing')
        
        const token = jwtCreator({ idUser, email }, secret, { algorithm: "HS256", expiresIn: "2h" })
    
        if(!token) throw new Error('Have an error with the dependency that generates the JWT')

        return { status: true, token }
    } catch (error) {
        return { status: false, error }
    }
}

function verifyJWT(
    req: Request,
    res: Response,
    next: NextFunction,
    secret: string | undefined= process.env.JWT_SECRET,
    jwtVerifier = verify
) {
    try {
        if(!secret) throw new Error('JWT Secret is missing')

        const { authorization } = req.headers

        
        if(!authorization) {
            const errorType = 'FORBIDDEN'
            const error = {
                type: errorType
            }

            res.status(HTTP_STATUS_CODE[errorType]).json({ status: false, error })
            return
        }
        
        const token = ('' + authorization).replace('Bearer ', '')
        
        const decoded = jwtVerifier(token, secret)

        if(!decoded) return res.status(401).send({ status: false, error: "Usuário não autenticado"})
        
        next()
    } catch (error) {
        return { status: false, error }
    }
}

export { generateJWT, verifyJWT }