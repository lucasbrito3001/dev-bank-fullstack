import { NextFunction, Response } from 'express'
import { Request } from 'express-jwt'
import { sign, verify } from 'jsonwebtoken'
import { IAuthService } from 'src/interfaces/auth.interface'

function generateJWT(
    idUser: string,
    email: string,
    secret: string | undefined = process.env.JWT_SECRET,
    jwtCreator = sign
): IAuthService {
    try {
        if(!secret) throw new Error('INTERNAL_SERVER_ERROR,MISSING_JWT_SECRET')
        
        const token = jwtCreator({ idUser, email }, secret, { algorithm: "HS256", expiresIn: "2h" })
    
        if(!token) throw new Error('INTERNAL_SERVER_ERROR,DEPENDENCY ERROR')

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
        if(!secret) throw new Error('INTERNAL_SERVER_ERROR,MISSING_JWT_SECRET')

        const { authorization } = req.headers
        if(!authorization) {
            res.locals = { status: false, error: "UNAUTHORIZED" }
            return next()
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