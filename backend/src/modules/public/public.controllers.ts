import { NextFunction, Request, Response } from "express";
import { generateJWT } from "src/services/auth";
import { compareHashString } from "src/services/crypt";
import User from "../auth/user/user.models";

async function tryLogin(
    req: Request, 
    res: Response, 
    next: NextFunction,
    model = User
) {
    try {
        const { email, password } = req.body

        const user = await model.findOne({ email })
        if(!user) {
            res.locals = { status: false, error: 'User not found' }
            return next()
        }
        
        const { isCorrectValue } = await compareHashString(user.password, password)
        if(!isCorrectValue) {
            res.locals = { status: false, error: 'Email or password incorrect' }
            return next()
        }
        
        const { status, token, error } = generateJWT('' + user._id, email)
        console.log(status, token, error)

        if(!status) {
            res.locals = { status, error }
            return next()
        }

        res.locals = { status: true, content: { token } }
    } catch (error) {
        res.locals = { status: false, error }
    }

    next();
}

export { tryLogin };
