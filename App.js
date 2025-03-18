const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

app.use(bodyParser.json())

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

morgan.token('requestBody', (request) => JSON.stringify(request.body))
app.use(morgan(' :method :url :response-time :requestBody'))

app.use('/api', require('./routes/routes'))


const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if(error.name === 'CastError'){
        return response.status(400).json({
            message: 'Formato incorrecto id',
            success: false
        })
    } else if(error.name === 'ValidationError'){
        return response.status(400).json({
            message: error.message,
            success: false
        })
    }

    next(error)
}

app.use(errorHandler)


module.exports = app