import express, { Request, Response } from 'express'
import { CreateNewWarningService } from '../services/CreateNewWarningService.service'
import { WarningsRepository } from '../repositories/Warnings/WarningsRepository'
import { StudentsRepository } from '../repositories/Students/StudentsRepository'
const warningsRoutes = express.Router()

const warningsRepository = new WarningsRepository()
const studentsRepository = new StudentsRepository()

warningsRoutes.post('/', async (req: Request, res: Response) => {
  try {
    const { idStudent, title, description } = req.body
    const createNewWarningService = new CreateNewWarningService(
      warningsRepository,
      studentsRepository,
    )
    const warning = await createNewWarningService.execute({
      idStudent,
      title,
      description,
    })

    res.status(201).json({
      item: warning,
      message: 'Advertência cadastrada com sucesso.',
    })
  } catch (err) {
    res.status(400).json({
      error: err,
      message: 'Erro ao tentar cadastrar nova advertência',
    })
  }
})

warningsRoutes.get('/:idStudent', async (req: Request, res: Response) => {
  try {
    const { idStudent } = req.params
    const warnings = await warningsRepository.list(idStudent)

    res.status(200).json({
      items: warnings,
      message: 'Busca de advertências concluída com sucesso.',
    })
  } catch (err) {
    res
      .status(400)
      .json({ error: err, message: 'Erro ao tentar buscar advertências.' })
  }
})

export { warningsRoutes }
