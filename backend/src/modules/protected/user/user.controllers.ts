import { NextFunction, Request, Response } from "express";
import User from "./user.models";
import { generateUserAccount } from "./user.services";
import { v4 as uuidv4 } from 'uuid'
import { hashValue } from "src/services/crypt";
import { generateInternalServerErrorResponse, responser } from "src/services/utils";
import { IServerResponse } from "src/interfaces/core.interface";
import { IUser } from "src/interfaces/user.interface";

async function readAll(
    req: Request,
    res: Response,
    next: NextFunction,
    model = User
): Promise<void> {
    let responseJson: IServerResponse = { status: true, statusHashMap: 'OK' }
    try {
        const users: IUser[] = await model.find().select('-password -account.password -account._id')

        responseJson.content = users;
    } catch (error) {
        responseJson = generateInternalServerErrorResponse('INTERNAL_SERVER_ERROR', error)
    }

    responser(res, responseJson);
}

async function readById(
    req: Request,
    res: Response,
    next: NextFunction,
    model = User
): Promise<void> {
    let responseJson: IServerResponse = { status: true, statusHashMap: 'OK' }
    try {
        const { id } = req.params
        const user = await model.find({ "_id": id }).select('-password -account.password -account._id')

        responseJson.content = user
    } catch (error) {
        responseJson = generateInternalServerErrorResponse('INTERNAL_SERVER_ERROR', error)
    }

    responser(res, responseJson);
}

async function create(
    req: Request,
    res: Response,
    next: NextFunction,
    model = User
): Promise<void> {
    let responseJson: IServerResponse = { status: true, statusHashMap: 'CREATED' }
    try {
        const { name, email, password, accountPassword } = req.body

        const { status, user, error } = await generateUserAccount({ name, email, password, accountPassword }, uuidv4)

        if(!status) {
            throw new Error(error)
        }

        await model.create(user)
    } catch (error) {
        responseJson = generateInternalServerErrorResponse('INTERNAL_SERVER_ERROR', error)
    }

    responser(res, responseJson);
}

async function updateById(
    req: Request,
    res: Response,
    next: NextFunction,
    model = User,
    hashPass = hashValue
): Promise<void> {
    let responseJson: IServerResponse = { status: true, statusHashMap: 'OK' }
    try {
        const { id } = req.params
        const { name, email, accountPassword } = req.body
        
        const infosToChange = {
            ...name && { name },
            ...email && { email }
        }
        
        if(accountPassword) {
            const { status, hashedValue } = await hashPass(accountPassword)

            if(!status) throw new Error('HASH_SERVICE')

            infosToChange['account.password'] = hashedValue
        }

        await model.updateOne({ "_id": id }, { "$set": infosToChange })
    } catch (error) {
        responseJson = generateInternalServerErrorResponse('INTERNAL_SERVER_ERROR', error)
    }

    responser(res, responseJson);
}

async function deleteById(
    req: Request,
    res: Response,
    next: NextFunction,
    model = User
): Promise<void> {
    let responseJson: IServerResponse = { status: true, statusHashMap: 'OK' }

    try {
        const { id } = req.params
        await model.deleteOne({ "_id": id })
    } catch (error) {
        responseJson = generateInternalServerErrorResponse('INTERNAL_SERVER_ERROR', error)
    }
    
    responser(res, responseJson);
}

export { readAll, readById, create, updateById, deleteById };