const Note = require('../db')

const getNotas = (request, response) => {

    try{

        Note.find({}).then(notes => {
            return response.status(200).json({
                message: 'Datos obtenidos con exito',
                success: true,
                notes
            })
        })

    }catch(err){
        console.log(err)
        return response.status(500).json({
            message: 'Ocurrio un error en el servidor',
            success: false
        })

    }
}

const getNota = (request, response) => {
    const id = request.params.id

    Note.findById(id).then(note => {
        if(note){
            return response.status(200).json({
                message: 'Usuario obtenido con exito',
                success: true,
                note
            })
        }

        return response.status(404).json({
            message: 'No existe el usuario en el servidor',
            success: false
        })

    }).catch(err => {
        console.error(err)
        return response.status(400).json({
            message: 'Formato incorrecto id',
            success: false
        })
    })
}

const deleteUser = (request, response) => {
    const id = request.params.id

    Note.findOneAndDelete({_id: id}).then(result => {
        console.log(result)
        if(result){
            return response.status(200).json({
                message: 'Usuario eliminado con exito',
                success: true
            })
        }

        return response.status(404).json({
            message:'El usuario no se encuentra registrado',
            success: false
        })
    }).catch(err => {
        console.log(err)
        return  response.status(500).json({
            message: 'Error en el servidor',
            success:false
        })
    })

}

const addNota = (request, response) => {
    const note = request.body

    console.log(note)
    if(!note.content){
        return response.status(400).json({
            message: 'Faltan datos obligatorios',
            success: false
        })
    }

    const nota = new Note({
        content: note.content,
        important: Boolean(note.important) || false
    })

    nota.save().then(result => {
        return response.status(200).json({
            message:'Nota añadida',
            success: true
        })
    }).catch(err => {
        return response.status(500).json({
            message: 'Error en el servidor'
        })
    })
}

const updateNote = (request, response) => {
    const id = request.params.id
    const body = request.body

    const newNote = {
        content: body.content,
        important: body.important
    }

    Note.findByIdAndUpdate({_id: id},newNote, {new: true}).then(result => {
        return response.status(200).json({
            message: 'Nota actualizada con exito',
            success: true
        })
    }).catch(err => {
        console.error(err)
        return response.status(500).json({
            message: 'Error en el servidor',
            success: false
        })
    })

}

module.exports = {
    getNotas,
    getNota,
    deleteUser,
    addNota,
    updateNote
}