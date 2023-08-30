import express, { Express } from 'express'
import dbConnection from './mongoConfigs'
import cors from 'cors'
import { routes } from './routes'

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
app.use(routes)

app.get('/', async (req: any, res: any) => {
  try {
    console.log('RELOAD COM O DOCKER COMPOSE!!!!')
    res
      .status(200)
      .send(`<h1>Servidor funcionando corretamente na porta ${PORT}</h1>`)
  } catch (err) {
    res.status(500).send('<h1>Falha ao iniciar o servidor</h1>', err)
  }
})
