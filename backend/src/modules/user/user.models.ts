import { model, Schema } from 'mongoose'

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    account: {
        bank: {
            type: String,
            required: true
        },
        agency: {
            type: String,
            required: true
        },
        number: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    }
})

const User = model('User', schema)

export default User