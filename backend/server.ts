import 'reflect-metadata'
import express, { Express, NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import dbConnection from './src/database/mongoConfigs'
import cors from 'cors'
import { routes } from './src/routes'
import './src/shared/containers'
import { Mongoose } from 'mongoose'
import { AppError } from './src/errors/AppError'

interface CustomExpress extends Express {
  mongo?: Mongoose
}

// Configs:
const app: CustomExpress = express()
const PORT = 4444
app.mongo = dbConnection
app.use(express.json())
app.use(cors())

app.use(routes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    })
  }

  return res.status(500).json({
    success: false,
    status: 'error',
    message: `Erro interno do servidor - ${err.message}`,
  })
})

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
