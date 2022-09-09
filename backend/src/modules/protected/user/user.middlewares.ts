import { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { HTTP_STATUS_CODE } from "src/services/constants";
import { checkDuplicatedKey, checkObjectTargetHavePassedProperties, checkRegisterExists } from "src/services/utils";
import User from "./user.models";

async function checkEmailDuplication(
    req: Request,
    res: Response,
    next: NextFunction,
    model = User
): Promise<void> {
    const { email } = req.body;
    
    if(!email) return

    const { status } = await checkDuplicatedKey('email', email, model)

    if(status) return next()

    const statusHashMap = 'DUPLICATED_KEYS'
    const error = {
        type: statusHashMap
    }

    res.status(HTTP_STATUS_CODE[statusHashMap]).json({ status, error })
}

async function checkMissingRequiredData(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const requiredFields = ["name", "email", "password", "accountPassword"];

    const { status, error: missingFields } = checkObjectTargetHavePassedProperties(req.body, requiredFields)

    if(status) return next()

    const statusHashMap = 'MISSING_REQUIRED_FIELDS'
    const error = {
        type: statusHashMap,
        keys: missingFields
    }

    res.status(HTTP_STATUS_CODE[statusHashMap]).json({ status, error })
}

async function checkUserExistence(
    req: Request,
    res: Response,
    next: NextFunction,
    model = User,
    idValidator: (id: string) => boolean = isValidObjectId
): Promise<void> {
    const { id } = req.params

    if(!id) {
        const errorType = 'INTERNAL_SERVER_ERROR'
        const error = {
            type: errorType
        }
        res.status(HTTP_STATUS_CODE[errorType]).json({ status: false, error })
        return
    }

    const isValidId = idValidator(id)

    if(!isValidId) {
        const errorType = 'INVALID_ID'
        const error = {
            type: errorType
        }
        res.status(HTTP_STATUS_CODE[errorType]).json({ status: false, error })
        return
    }

    const { status } = await checkRegisterExists('_id', id, model)

    if(!status) {
        const errorType = 'REGISTRY_NOT_FOUND'
        const error = {
            type: errorType
        }
        res.status(HTTP_STATUS_CODE[errorType]).json({ status, error })
        return
    }

    return next()
}

export { checkEmailDuplication, checkMissingRequiredData, checkUserExistence };
