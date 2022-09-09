import { ObjectId } from 'mongodb'
import { model, Schema } from 'mongoose'

const AccountSchema = new Schema({
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
})

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please send your name'],
    },
    email: {
        type: String,
        required: [true, 'Please send an email address'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please send your password']
    },
    account: {
        type: AccountSchema,
        required: true
    }
})

const User = model('User', UserSchema)

export default User