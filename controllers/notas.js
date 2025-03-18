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

const getNota = (request, response, next) => {
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
        next(err)
    })
}

const deleteUser = (request, response, next) => {
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
        console.error(err)
        next(err)
    })

}

const addNota = (request, response, next) => {
    const note = request.body

    console.log(note)

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
        console.error(err)
        next(err)
    })
}

const updateNote = (request, response, next) => {
    const id = request.params.id
    const {content, important} = request.body


    Note.findByIdAndUpdate({_id: id},{content, important}, {new: true, runValidators:true, context:'query'})
    .then(result => {
        return response.status(200).json({
            message: 'Nota actualizada con exito',
            success: true
        })
    }).catch(err => {
        console.error(err)
        next(err)
    })

}

module.exports = {
    getNotas,
    getNota,
    deleteUser,
    addNota,
    updateNote
}