const express = require('express')
const router = express.Router()

const { getUsers, getUser, deleteUser, addNota, updateNote } = require('../controllers/notas')

router.get('/notes', getUsers)
router.get('/note/:id',getUser)
router.delete('/note/:id', deleteUser)
router.post('/addNota', addNota)
router.put('/note/:id', updateNote)

module.exports = router