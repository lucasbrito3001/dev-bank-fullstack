import { NextFunction, Request, Response } from "express";
import { hashValue } from "src/services/crypt";
import Account from "./user.models";
import { v4 as uuidv4 } from 'uuid'
import { IUserDTO, IUserGenerator } from "src/interfaces/user.interface";

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
        const { name, email, password, accountPassword } = req.body

        if(name || !email || !password || !accountPassword) {
            res.locals = { status: false, error: 'MISSING_INFORMATIONS' }
        }

        const { status, user, error } = await generateUserAccount(req.body)

        if(!status) {
            res.locals = { status, error }
            next()
        }

        await model.create(user)

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
    try {
        const { id } = req.params
        const { name, email, password, accountPassword } = req.body

        const user = await model.findOneAndUpdate({ "_id": id }, { "$set": { name, email, password, accountPassword } })

        res.locals = { status: true, user }
    } catch (error) {
        res.locals = { status: false, error }
    }

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

async function generateUserAccount({name, email, password, accountPassword}: IUserDTO): Promise<IUserGenerator> {
    const accountNumber = uuidv4()

    const { 
        status: statusPass, 
        hashedValue: hashedPass 
    } = await hashValue(password)

    const {
        status: statusAccountPass, 
        hashedValue: hashedAccountPass 
    } = await hashValue(accountPassword)

    if(!statusPass || !statusAccountPass) return { status: false, error: 'INTERNAL_SERVER_ERROR,HASH_ERROR' }

    return {
        status: true,
        user: {
            name,
            email,
            password: hashedPass || '',
            account: {
                bank: "1234",
                agency: "0001",
                number: accountNumber,
                password: hashedAccountPass || ''
            }
        }
    }
}

export { readAll, readById, create, updateById, deleteById };
