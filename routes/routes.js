const express = require('express')
const router = express.Router()

const { getNotas, getNota, deleteUser, addNota, updateNote } = require('../controllers/notas')

router.get('/notes', getNotas)
router.get('/note/:id',getNota)
router.delete('/note/:id', deleteUser)
router.post('/addNota', addNota)
router.put('/note/:id', updateNote)

module.exports = router