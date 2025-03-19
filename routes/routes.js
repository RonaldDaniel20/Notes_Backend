const express = require('express')
const router = express.Router()

const { getNotas, getNota, deleteUser, addNota, updateNote } = require('../controllers/notas')
const {
     register,
     getUsers,

    } = require('../controllers/users')

router.get('/notes', getNotas)
router.get('/note/:id',getNota)
router.delete('/note/:id', deleteUser)
router.post('/addNota', addNota)
router.put('/note/:id', updateNote)

router.post('/user',register)
router.get('/users', getUsers)

module.exports = router