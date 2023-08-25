import express from 'express'
import { CreateNewWarningService } from '../services/CreateNewWarningService.service'
import { WarningsRepository } from '../repositories/Warnings/WarningsRepository'
import { StudentsRepository } from '../repositories/Students/StudentsRepository'

const warningsRoutes = express.Router()

const warningsRepository = new WarningsRepository()
const studentsRepository = new StudentsRepository()

warningsRoutes.post('/', async (req, res) => {
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

warningsRoutes.get('/:idStudent', async (req, res) => {
  try {
    const { idStudent } = req.params
    const warnings = await warningsRepository.list(idStudent)

    res.status(200).json({
      success: true,
      title: 'Sucesso',
      message: 'Busca de advertências concluída com sucesso.',
      items: warnings,
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      title: 'Erro ao tentar buscar advertências.',
      message: err.message,
      error: err,
    })
  }
})

export { warningsRoutes }
