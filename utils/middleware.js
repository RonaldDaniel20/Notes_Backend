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
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return response.status(400).json({ 
            message: 'expected `username` to be unique', 
            success: false })
    } else if (error.name === 'JsonWebTokenError'){
        return response.status(401).json({
            message: 'Token invalido',
            success: false
        })
    }else if(error.name === 'TokenExpiredError'){
        return response.status(401).json({
            message:'Token expirado',
            success: false
        })
    }

    next(error)
}

module.exports = { errorHandler }