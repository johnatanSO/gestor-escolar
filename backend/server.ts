import cors from 'cors'
import 'reflect-metadata'
import 'express-async-errors'
import * as dotenv from 'dotenv'
import { Mongoose } from 'mongoose'
import express, { Express, Request, Response } from 'express'

import './src/shared/containers'
import { routes } from './src/routes'
import dbConnection from './src/database/mongoConfigs'
import { handleError } from './src/middlewares/handleError'
dotenv.config()

interface CustomExpress extends Express {
  mongo?: Mongoose
}

// Configs:
const app: CustomExpress = express()
const PORT = process.env.SERVER_PORT
app.mongo = dbConnection
app.use(express.json())
app.use(cors())

app.use(routes)

app.use(handleError)

app.listen(PORT, () => console.log(`SERVIDOR RODANDO NA PORTA ${PORT}!`))

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
