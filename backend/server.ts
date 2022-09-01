import app from './src/app'
import { createConnection } from 'mongoose'


const startApp = () => {
    const port = process.env.API_PORT || 4000
    
    app.listen(port, () => {
        console.log(`[SERVER] > The server is running on port 🚪: ${port}`)
    })
}

const connectDatabase = async () => {
    createConnection()
}

startApp()