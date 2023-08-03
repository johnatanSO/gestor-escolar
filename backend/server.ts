import express, { Express } from 'express'
import dbConnection from './mongoConfigs'
import cors from 'cors'
import { usersRoutes } from './routes/users'
import { studentsRoutes } from './routes/students'
import { subjectsRoutes } from './routes/subjects'
import { warningsRoutes } from './routes/warnings'

interface CustomExpress extends Express {
  mongo?: any
}

// Configs:
const app: CustomExpress = express()
const PORT = 4444
app.mongo = dbConnection
app.use(express.json())
app.use(cors())
app.listen(PORT, () => console.log(`SERVIDOR RODANDO NA PORTA ${PORT}!`))

// Rotas do sistema:
app.use('/users', usersRoutes)
app.use('/students', studentsRoutes)
app.use('/subjects', subjectsRoutes)
app.use('/warnings', warningsRoutes)

app.get('/', async (req: any, res: any) => {
  try {
    res
      .status(200)
      .send(`<h1>Servidor funcionando corretamente na porta ${PORT}</h1>`)
  } catch (err) {
    res.status(500).send('<h1>Falha ao iniciar o servidor</h1>', err)
  }
})
