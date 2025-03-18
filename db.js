const mongoose = require('mongoose')
require('dotenv').config()


const url =  process.env.MONGODB_URL
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

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Note = mongoose.model('Note', noteSchema)

module.exports = Note