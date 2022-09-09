import { NextFunction, Request, Response } from "express";
import { IServerResponse } from "src/interfaces/core.interface";
import { generateJWT } from "src/services/auth";
import { compareHashString } from "src/services/crypt";
import { generateInternalServerErrorResponse, responser } from "src/services/utils";
import User from "../protected/user/user.models";

async function tryLogin(
    req: Request, 
    res: Response, 
    next: NextFunction,
    model = User
) {
    let responseJson: IServerResponse = { status: true, statusHashMap: 'OK' }
    try {
        const { email, password } = req.body

        const user = await model.findOne({ email })

        if(!user) return
        
        const { isCorrectValue } = await compareHashString(user.password, password)
        
        if(!isCorrectValue) {
            throw new Error('UNAUTHORIZED')
        }
        
        const { status, token, error } = generateJWT('' + user._id, email)
        
        if(!status) throw new Error(error)
        
        responseJson.token = token
    } catch (error) {
        let message: string = ''

        if(error instanceof Error) message = error.message
        else message = String(error)

        if(message === 'UNAUTHORIZED') responseJson = generateInternalServerErrorResponse('UNAUTHORIZED', 'Unauthorized, the user sent credentials that do not match')
        else responseJson = generateInternalServerErrorResponse('INTERNAL_SERVER_ERROR', error)
    }

    responser(res, responseJson);
}

export { tryLogin };
