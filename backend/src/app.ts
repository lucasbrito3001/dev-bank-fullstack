// server and middlewares
import express from "express"
import morgan from "morgan"
import cors from "cors"

// express server
const app = express()

// middlewares
app.use(morgan('combined'))
app.use(cors())

export default app