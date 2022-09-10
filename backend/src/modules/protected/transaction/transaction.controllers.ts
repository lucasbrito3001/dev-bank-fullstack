import { NextFunction, Request, Response } from "express";
import { IServerResponse } from "src/interfaces/core.interface";
import { generateInternalServerErrorResponse, responser } from "src/services/utils";
import { ITransaction } from "src/interfaces/transaction.interface"
import Transaction from "./transaction.models";

async function readAll(
    req: Request, 
    res: Response, 
    next: NextFunction,
    model = Transaction
) {
    let responseJson: IServerResponse = { status: true, statusHashMap: 'OK' }

    try {
        const transactions: ITransaction[] = await model.find()

        responseJson.content = transactions
    } catch (error) {
        responseJson = generateInternalServerErrorResponse('INTERNAL_SERVER_ERROR', error)
    }

    responser(res, responseJson)
}

async function readById(
    req: Request,
    res: Response,
    next: NextFunction,
    model = Transaction
): Promise<void> {
    let responseJson: IServerResponse = { status: true, statusHashMap: 'OK' }
    try {
        const { id } = req.params
        const user: ITransaction[] = await model.find({ "_id": id })

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
    model = Transaction
): Promise<void> {
    let responseJson: IServerResponse = { status: true, statusHashMap: 'CREATED' }
    try {
        const { source, destination, value, status } = req.body

        const transaction = {
            source, destination, value, status
        }

        await model.create(transaction)
    } catch (error) {
        responseJson = generateInternalServerErrorResponse('INTERNAL_SERVER_ERROR', error)
    }

    responser(res, responseJson);
}

async function updateById(
    req: Request,
    res: Response,
    next: NextFunction,
    model = Transaction
): Promise<void> {
    let responseJson: IServerResponse = { status: true, statusHashMap: 'OK' }

    try {
        const { id } = req.params
        const { status } = req.body
        
        const infosToChange = {
            status
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
    model = Transaction
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
