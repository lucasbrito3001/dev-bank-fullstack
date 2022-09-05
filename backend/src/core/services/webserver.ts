// server and middlewares
import express from "express"
import morgan from "morgan"
import cors from "cors"

// swagger docs
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from '@configs/swagger.json'

// routes
import TransactionRoutes from '@modules/auth/transaction/transaction.routes'
import AccountRoutes from '@modules/auth/user/user.routes'
import PublicRoutes from '@modules/public/public.routes'
import { responser } from "src/services/utils"

// express server
const app = express()

// middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// declaring routes
const BASE_URL = '/api/v1'

app.get(`${BASE_URL}/`, (req, res) => res.status(200).send('Hello world! Welcome to the DevBank API...'))
app.use(`${BASE_URL}/transactions`, TransactionRoutes)
app.use(`${BASE_URL}/users`, AccountRoutes)
app.use(`${BASE_URL}/publics`, PublicRoutes)

// responser middleware
app.use(responser)

export const createWebserver = () => {
    let server: any
    const port = process.env.API_PORT || 4000

    function start() {
        try {
            console.log('\n[WEBSERVER] > Starting...')
            server = app.listen(port, () => {
                console.log(`[WEBSERVER] > The server is running on port 🚪: ${port}`)
            })
        } catch (error) {
            console.log(`[WEBSERVER] > Have an error to start server \n${error}`)
        }

        return
    }

    function stop() {
        try {
            console.log('\n[WEBSERVER] > Stopping...')
            server.close()
            console.log(`[WEBSERVER] > The server is stopped successfully`)
        } catch (error) {
            console.log(`[WEBSERVER] > Have an error to stop server \n${error}`)
        }

        return
    }

    return { start, stop }
}