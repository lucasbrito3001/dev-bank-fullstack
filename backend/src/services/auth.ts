import { sign } from 'jsonwebtoken'

function generateJWT(idUser: string, email: string) {
    try {
        if(!process.env.JWT_SECRET) throw new Error('INTERNAL_SERVER_ERROR,MISSING_JWT_SECRET')
        
        const token = sign({ idUser, email, exp: '' }, process.env.JWT_SECRET, { algorithm: "HS256" })
    
        if(!token) throw new Error('INTERNAL_SERVER_ERROR,DEPENDENCY ERROR')

        return { status: true, token }
    } catch (error) {
        return { status: false, error }
    }
}

function verifyJWT() {

}

export { generateJWT, verifyJWT }