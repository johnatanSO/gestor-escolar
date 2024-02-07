import 'reflect-metadata'
import express, { Express, Request, Response } from 'express'
import 'express-async-errors'
import dbConnection from './src/shared/infra/mongodb/index'
import cors from 'cors'
import { routes } from './src/shared/infra/http/routes'
import './src/shared/containers'
import { Mongoose } from 'mongoose'
import { handleError } from './src/shared/infra/http/middlewares/handleError'

interface CustomExpress extends Express {
  mongo?: Mongoose
}

const app: CustomExpress = express()

const PORT = process.env.SERVER_PORT

app.mongo = dbConnection

app.use(express.json())
app.use(cors())
app.use(routes)
app.use(handleError)

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}!`))

app.get('/', async (req: Request, res: Response) => {
  return res.status(200).send(`<h1>Servidor rodando na porta  ${PORT}</h1>`)
})
