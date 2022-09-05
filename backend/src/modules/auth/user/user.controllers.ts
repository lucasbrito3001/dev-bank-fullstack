import { NextFunction, Request, Response } from "express";
import { hashValue } from "src/services/crypt";
import Account from "./user.models";

async function readAll(
    req: Request,
    res: Response,
    next: NextFunction,
    model = Account
) {
    try {
        const users = await model.find().select('-password -account.password')

        res.locals = { status: true, content: users };
    } catch (error) {
        res.locals = { status: false, error };
    }

    next();
}

async function readById(
    req: Request,
    res: Response,
    next: NextFunction,
    model = Account
) {
    try {
        const { id } = req.params
        const user = await model.find({ id: id }).select('-password -account.password')

        res.locals = { status: true, content: user };
    } catch (error) {
        res.locals = { status: false, error };
    }

    next();
}

async function create(
    req: Request,
    res: Response,
    next: NextFunction,
    model = Account
) {
    try {
        const { 
            status: statusPass, 
            hashedValue: hashedPass 
        } = await hashValue(req.body.password)
        const { 
            status: statusAccountPass, 
            hashedValue: hashedAccountPass 
        } = await hashValue(req.body.account.password)

        if(!statusPass || !statusAccountPass) {
            res.locals = { status: false, error: 'INTERNAL_SERVER_ERROR' }
            next()
        }

        req.body.password = hashedPass
        req.body.account.password = hashedAccountPass

        await model.create(req.body)

        res.locals = { status: true };
    } catch (error) {
        res.locals = { status: false, error };
    }

    next();
}

async function updateById(
    req: Request,
    res: Response,
    next: NextFunction,
    model = Account
) {
    next();
}

async function deleteById(
    req: Request,
    res: Response,
    next: NextFunction,
    model = Account
) {
    next();
}

export { readAll, readById, create, updateById, deleteById };
