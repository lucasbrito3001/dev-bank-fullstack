import { hash, compare } from 'bcrypt'
import { IHashValue } from 'src/interfaces/crypt.interface'

async function hashValue(value: string, salt: number = 10): Promise<IHashValue> {
    try {
        const hashedValue = await hash(value, salt)
    
        return { status: true, hashedValue }
    } catch (error) {
        return { status: false, error }
    }
}

async function compareHashString(hashed: string, received: string) {
    const isCorrectValue = await compare(received, hashed)
    return { isCorrectValue }
}

export { hashValue, compareHashString }