import express from 'express'
import usuarioRouter from './routes/usuarioRoutes'
import produtoRouter from './routes/productRoutes'
import cors from "cors"
import { prisma } from './utils/prismaClient'
import { createUsuarioService } from './services/usuarioServices'

//first insert
async function createAdmin() {
  const users = await prisma.usuario.findMany()

  await createUsuarioService({
    username: 'admin',
    password: '123',
    nome: 'admin',
    tipo: '0',
    status: 'A',
    quantacesso: 0
  })

  console.log('admin criado')
}

createAdmin()

const app = express()
const PORT = 3000

app.use(express.json())

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/usuario', usuarioRouter)
app.use('/produto', produtoRouter)

app.listen(PORT, () => {
    console.log(`servidor rodando na porta ${PORT}`)
})