const app = require('./App')
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en: http://localhost:${PORT}`)
})
