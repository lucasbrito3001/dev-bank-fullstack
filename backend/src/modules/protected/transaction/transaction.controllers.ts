import { NextFunction, Request, Response } from "express";
import Transaction from "./transaction.models";

async function getAll(
    req: Request, 
    res: Response, 
    next: NextFunction,
    model = Transaction
) {
    try {
        res.locals = { status: true, content: await model.find() }
    } catch (error) {
        res.locals = { status: false, error }
    }

    next();
}

async function getById(req: Request, res: Response, next: NextFunction) {
    next();
}

export { getAll, getById };
