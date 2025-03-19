const express = require('express')
const router = express.Router()

const { getNotas, getNota, deleteUser, addNota, updateNote } = require('../controllers/notas')
const {
     register,
     getUsers,

    } = require('../controllers/users')

const {
    login
} = require('../controllers/login')

router.get('/notes', getNotas)
router.get('/note/:id',getNota)
router.delete('/note/:id', deleteUser)
router.post('/addNota', addNota)
router.put('/note/:id', updateNote)

//Registro
router.post('/user',register)
router.get('/users', getUsers)

//Login
router.post('/login', login)

module.exports = router