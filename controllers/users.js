const User = require('../models/user')
const bcrypt = require('bcrypt')

const register = async (request, response, next) => {
    
    const {username, name, password} = request.body

    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({
        username,
        name,
        passwordHash
    })

    try{
        await user.save()

        return response.status(200).json({
            message: 'Usuario registrado con exito',
            success: true
        })
    }catch(error){
        next(error)
    }
}

const getUsers = async (request, response) => {
    try{

        const users = await User.find({}).populate('notes', {content: 1, important: 1})

        return response.status(200).json({
            message: 'Usuarios obtenidos con exito',
            success: true,
            users
        })
    }catch(error){
        return response.status(500).json({
            message: 'Ocurrio un error el servidor',
            success: false
        })
    }
}

module.exports = {register, getUsers}