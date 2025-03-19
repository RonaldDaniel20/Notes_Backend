const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
require('dotenv').config()

const login = async (request, response) => {
   try{
    const {username, password} = request.body

    const user = await User.findOne({username})
    
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)
    
    if(!(user && passwordCorrect)){
        return response.status(401).json({
            message: 'Usuario o contraseña incorrectos',
            success: false
        })
    }

    const useForToken = {
        username:  user.username,
        id: user._id
    }

    const token = jwt.sign(useForToken, process.env.SECRET, {
        expiresIn: '1h',
    })

    return response.status(200).json({
        message: 'Autenticación correcta',
        success: true,
        token
    })

   }catch(error){
    console.error(error)
    return response.status(500).json({
        message: 'Ocurrio un problema en el servidor',
        success: false
    })
   }
}

module.exports = {
    login
}