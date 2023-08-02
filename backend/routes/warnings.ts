import express, { Request, Response } from 'express'
import { CreateNewWarningService } from '../services/CreateNewWarningService.service'
import { WarningsRepository } from '../repositories/Warnings/WarningsRepository'
const warningsRoutes = express.Router()
const warningsRepository = new WarningsRepository()

warningsRoutes.post('/', async (req: Request, res: Response) => {
  try {
    const { studentId, title, description } = req.body
    const createNewWarningService = new CreateNewWarningService(
      warningsRepository,
    )
    await createNewWarningService.execute({
      studentId,
      title,
      description,
    })

    res.status(204).json({
      message: 'Advertência cadastrada com sucesso.',
    })
  } catch (err) {
    res.status(400).json({
      error: err,
      message: 'Erro ao tentar cadastrar nova advertência',
    })
  }
})

export { warningsRoutes }
