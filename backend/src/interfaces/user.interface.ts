export interface IUserDTO {
    name: string,
    email: string,
    password: string,
    accountPassword: string
}

export interface IAccount {
    bank: string
    agency: string
    number: string
    password: string
}

export interface IUser {
    name: string
    email: string
    password: string
    account: IAccount
}

export interface IUserGenerator {
    status: boolean
    user?: IUser
    error?: any
}