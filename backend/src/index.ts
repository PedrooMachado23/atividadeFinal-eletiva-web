import express from 'express'
import usuarioRouter from './routes/usuarioRoutes'
import produtoRouter from './routes/productRoutes'

const app = express()
const PORT = 3000

app.use(express.json())

app.use('/usuario', usuarioRouter)
app.use('/produto', produtoRouter)

app.listen(PORT, () => {
    console.log(`servidor rodando na porta ${PORT}`)
})