import { IHTTPStatus } from "src/services/constants"
import { ITransaction } from "./transaction.interface"
import { IUser } from "./user.interface"

export interface IFactoryCore {
    start: () => Promise<void> | void
    stop: () => Promise<void> | void
}

export interface IResponseError {
    type: string
    keys?: string[]
}

export interface IServerResponse {
    status: boolean
    statusHashMap: keyof IHTTPStatus,
    content?: IUser[] | ITransaction[] | IUser | ITransaction,
    error?: IResponseError
    errorLog?: any
    token?: string
}