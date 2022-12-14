const HTTP_STATUS_CODE: IHTTPStatus = {
    OK: 200,
    MISSING_REQUIRED_FIELDS: 200,
    REGISTRY_NOT_FOUND: 200,
    DUPLICATED_KEYS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    INVALID_ID: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
}

interface IHTTPStatus {
    OK: number,
    MISSING_REQUIRED_FIELDS: number,
    REGISTRY_NOT_FOUND: number,
    DUPLICATED_KEYS: number,
    CREATED: number,
    BAD_REQUEST: number,
    INVALID_ID: number,
    UNAUTHORIZED: number,
    FORBIDDEN: number,
    NOT_FOUND: number,
    INTERNAL_SERVER_ERROR: number
}

export {
    HTTP_STATUS_CODE,
    IHTTPStatus
}