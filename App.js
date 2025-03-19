const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const middleware = require('./utils/middleware')
const { connectDB } = require('./db')

require('dotenv').config()

app.use(bodyParser.json())

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

connectDB()

morgan.token('requestBody', (request) => JSON.stringify(request.body))
app.use(morgan(' :method :url :response-time :requestBody'))

app.use('/api', require('./routes/routes'))

app.use(middleware.errorHandler)


module.exports = app