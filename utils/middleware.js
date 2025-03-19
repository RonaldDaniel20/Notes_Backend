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

module.exports = { errorHandler }