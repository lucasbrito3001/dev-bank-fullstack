import { Response } from "express";
import { IServerResponse } from "src/interfaces/core.interface";
import { IFactoriesObject } from "src/interfaces/generalFactoryObject.interface";
import { IGeneralModels } from "src/interfaces/models.interface";
import { HTTP_STATUS_CODE, IHTTPStatus } from "./constants";

function responser(
    res: Response,
    { status, statusHashMap, content, error, errorLog, token }: IServerResponse
) {
    const statusCode = HTTP_STATUS_CODE[statusHashMap];

    if (statusCode === 500) console.log(errorLog);

    res.status(statusCode).json({
        status,
        ...(content && { content }),
        ...(error && { error }),
        ...(token && { token })
    });
}

function generateInternalServerErrorResponse(statusHashMap: keyof IHTTPStatus, error: any): IServerResponse {
    return {
        status: false,
        statusHashMap,
        error: { type: statusHashMap },
        errorLog: error
    };
}


async function checkDuplicatedKey(
    keyToCheck: string,
    valueToCheck: string | number,
    model: IGeneralModels
): Promise<IFactoriesObject> {
    const userByEmail = await model.findOne({ [keyToCheck]: valueToCheck });

    return { status: userByEmail === null };
}

async function checkRegisterExists(
    keyToCheck: string,
    valueToCheck: string,
    model: IGeneralModels
): Promise<IFactoriesObject> {
    const register = await model.findOne({ [keyToCheck]: valueToCheck });

    return { status: register !== null };
}

function checkObjectTargetHavePassedProperties(
    target: {[key: string]: string | number},
    properties: string[]
): IFactoriesObject {
    const isBodyFull = properties.every((field) => target[field]);

    if (isBodyFull) return { status: true };

    const missingFields: string[] = []

    properties.forEach(property => {
        if(!target[property]) missingFields.push(property)
    })

    return { status: false, error: missingFields }
}

export { responser, generateInternalServerErrorResponse, checkDuplicatedKey, checkObjectTargetHavePassedProperties, checkRegisterExists };
