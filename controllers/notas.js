const Note = require('../models/notes')

const getNotas = async (request, response) => {

    try{

        const notes = await Note.find({})
        return response.status(200).json({
            message: 'Datos obtenidos con exito',
            success:true,
            notes
        })

    }catch(error){
        console.error(error)
        return response.status(500).json({
            message: 'Ocurrio un error en el servidor',
            success: false
        })
    }
}

const getNota = async (request, response, next) => {
    const id = request.params.id
  
    try {
        const note = await Note.findById({_id:id})

        if(!note){
            return response.status(404).json({
                message: 'No existe el usuario en el servidor',
                success: false
            })
        }

        return response.status(200).json({
            message: 'Usuario obtenido con exito',
            success: true,
            note
        })

    }catch(error){
        console.error(error)
        next(error)
    }
}

const deleteUser = async (request, response, next) => {
    const id = request.params.id

    try{

        const id = request.params.id
        const note = await Note.findOneAndDelete({_id:id})

        if(!note){
            return response.status(404).json({
                message: 'No existe el usuario en el servidor',
                success: false
            })
        }

        return response.status(200).json({
            message: 'Usuario eliminado con exito',
            success: true,
            note
        })

    }catch(error){
        console.error(error)
        next(error)
    }
}

const addNota = async (request, response, next) => {

    try{
        const {content, important} = request.body

        const nota = new Note({
            content: content,
            important: Boolean(important) || false
        })

        await nota.save()
        return response.status(200).json({
                message:'Nota añadida con exito',
                success: true
        })       

    }catch(error){
        console.error(error)
        next(error)
    }
}

const updateNote = async (request, response, next) => {

    try{
        const id = request.params.id
        const {content, important} = request.body

        const note = await Note.findByIdAndUpdate({_id: id},{content, important}, {new: true, runValidators:true, context:'query'})
        console.log(note)

        if(!note){
            return response.status(404).json({
                message: 'No existe el usuario en el servidor',
                success: false
            })
        }

        return response.status(200).json({
            message: 'Usuario actualizado con exito',
            success: true,
            note
        })

    }catch(error){
        console.error(error)
        next(error)
    }
}

module.exports = {
    getNotas,
    getNota,
    deleteUser,
    addNota,
    updateNote
}