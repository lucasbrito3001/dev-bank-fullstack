// server and middlewares
import express from "express"
import morgan from "morgan"
import cors from "cors"
import { config } from 'dotenv'
config()

// swagger docs
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from '@configs/swagger.json'

// routes
import TransactionRoutes from '@modules/protected/transaction/transaction.routes'
import AccountRoutes from '@modules/protected/user/user.routes'
import PublicRoutes from '@modules/public/public.routes'
import { verifyJWT } from "src/services/auth"
import { HTTP_STATUS_CODE } from "src/services/constants"

// express server
const app = express()

// middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// declaring routes
const BASE_ENDPOINT = '/api/v1'
const BASE_PUBLIC_ENDPOINT = `${BASE_ENDPOINT}/public`
const BASE_PROTECTED_ENDPOINT = `${BASE_ENDPOINT}/protected`

app.get(`${BASE_ENDPOINT}/`, (req, res) => res.status(200).send('Hello world! Welcome to the DevBank API...'))
// public routes
app.use(`${BASE_PUBLIC_ENDPOINT}/`, PublicRoutes)
// protected routes
app.all(`${BASE_PROTECTED_ENDPOINT}/*`, verifyJWT)
app.use(`${BASE_PROTECTED_ENDPOINT}/transactions`, TransactionRoutes)
app.use(`${BASE_PROTECTED_ENDPOINT}/users`, AccountRoutes)

app.all('*', (req, res) => {
    const responseJson = {
        status: false,
        error: `The endpoint ${req.path} don't exists, read the API documentation`,
        docLink: `${BASE_ENDPOINT}`
    }

    res.status(HTTP_STATUS_CODE['NOT_FOUND']).json(responseJson)
})

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