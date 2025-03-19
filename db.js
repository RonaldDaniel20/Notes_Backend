const mongoose = require('mongoose')
require('dotenv').config()


const url =  process.env.MONGODB_URL
mongoose.set('strictQuery', false)

const connectDB = () => {
  mongoose.connect(url).then(() =>{
      console.log('Base de datos conectada')
  }).catch(err => {
      console.log(err)
  })
}

module.exports =  { connectDB }