import User from "@modules/protected/user/user.models";
import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { isValidObjectId } from "mongoose";
import { HTTP_STATUS_CODE } from "src/services/constants";
import { checkObjectTargetHavePassedProperties, checkRegisterExists } from "src/services/utils";

async function checkMissingRequiredData(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const requiredFields = ["email", "password"];

    const { status, error: missingFields } = checkObjectTargetHavePassedProperties(req.body, requiredFields)

    if(status) return next()

    const errorType = 'MISSING_REQUIRED_FIELDS'
    const error = {
        type: errorType,
        keys: missingFields
    }

    res.status(HTTP_STATUS_CODE[errorType]).json({ status, error })
}

async function checkUserExistence(
    req: Request,
    res: Response,
    next: NextFunction,
    model = User
): Promise<void> {
    const { email } = req.body

    const { status } = await checkRegisterExists('email', email, model)

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

export { checkMissingRequiredData, checkUserExistence }