import 'reflect-metadata'
import express, { Express, Request, Response } from 'express'
import dbConnection from './src/database/mongoConfigs'
import cors from 'cors'
import { routes } from './src/routes'
import './src/shared/containers'
import { Mongoose } from 'mongoose'

interface CustomExpress extends Express {
  mongo?: Mongoose
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

app.get('/', async (req: Request, res: Response) => {
  try {
    return res
      .status(200)
      .send(`<h1>Servidor funcionando corretamente na porta ${PORT}</h1>`)
  } catch (err) {
    return res.status(500).send(
      `
        <h1>Falha ao iniciar o servidor</h1>
        </br>
        <p>${err.message}</p>
      `,
    )
  }
})
