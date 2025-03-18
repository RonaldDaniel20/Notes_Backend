const mongoose = require('mongoose')
require('dotenv').config()


const url = `mongodb+srv://danielronaldmutumbajoy:${process.env.DB_PASSWORD}@cluster0.zjqoh.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url).then(() =>{
    console.log('Base de datos conectada')
}).catch(err => {
    console.log(err)
})

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// const notes = [
//     { content: 'Mongoose makes things simple', important: false },
//     { content: 'Node.js is powerful', important: true }
// ];

// Promise.all(notes.map(noteData => {
//     const note = new Note(noteData)
//     return note.save()
// })).then(results => {
//     console.log('Todas las notas fueron guardadas', results)
//     mongoose.connection.close()
// }).catch(err => {
//     console.err(err)
// })

// //Creando una nota
// const note = new Note({
//     content: 'Html is easy',
//     important: true,
// })

// note.save().then(result => {
//     console.log('Note salved!')
//     console.log(result)
//     mongoose.connection.close()
// }).catch(err => {
//     console.err(err)
// })

//Buscando una nota

Note.find({important: true}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})