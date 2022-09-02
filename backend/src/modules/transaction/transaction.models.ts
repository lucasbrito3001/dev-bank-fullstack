import { model, Schema } from 'mongoose'

const schema = new Schema({
    source: {
        type: Schema.Types.ObjectId,
        required: true
    },
    destination: {
        type: Schema.Types.ObjectId,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        required: true
    }
})

const Transaction = model('Transaction', schema)

export default Transaction