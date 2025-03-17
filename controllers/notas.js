let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]

const getUsers = (request, response) => {
    return response.status(200).json({
        message: 'Datos obtenidos con exito',
        success: true,
        notes
    })
}

const getUser = (request, response) => {
    const id = parseInt(request.params.id)
    const user = notes.find(note => note.id === id)
    if(user){
        return response.status(200).json({
            message: 'Usuario obtenido con exito',
            success: true,
            user
        })
    }

    return response.status(404).json({
        message: 'No existe el usuario en el servidor',
        success: false
    })
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
    const user = notes.find(user => user.id === id)
    if(user){
        notes = notes.filter(user => user.id !== id)
        return response.status(200).json({
            message: 'Usuario eliminado con exito',
            success: true
        })
    }

    return response.status(404).json({
        message: 'El usuario no se encuentra registrado',
        success:false
    })
}

const addNota = (request, response) => {
    const maxId = notes.length > 0 
        ? Math.max(...notes.map(n => n.id))
        : 0

    const note = request.body

    console.log(note)
    if(!note.content){
        return response.status(400).json({
            message: 'Faltan datos obligatorios',
            success: false
        })
    }

    const nota = {
        content: note.content,
        important: Boolean(note.important) || false,
        id: maxId + 1
    }

    notes = notes.concat(nota)

    return response.status(200).json({
        message:"Nota añadida",
        success: true
    })
}

const updateNote = (request, response) => {
    const id = Number(request.params.id)

    if(!id){
        return response.status(404).json({
            message: 'El usuario no se encuntra registrado',
            success: false
        })
    }

    const note = notes.find(note => note.id === id)
    const changeNotes = {...note, important:!note.important}
    notes = notes.map(nota => nota.id !== id ? nota : changeNotes)

    return response.status(200).json({
        message: 'El contacto se actualizo correctamente',
        success:true
    })

}

module.exports = {
    getUsers,
    getUser,
    deleteUser,
    addNota,
    updateNote
}