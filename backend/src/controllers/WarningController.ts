import { ListWarningsService } from '../useCases/Warning/ListWarnings/ListWarningsService.service'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateNewWarningService } from '../useCases/Warning/CreateNewWarning/CreateNewWarningService.service'
import { UpdateWarningsAmount } from '../useCases/Student/UpdateWarningsAmount/UpdateWarningsAmount.service'

export class WarningController {
  async createNewWarning(req: Request, res: Response): Promise<Response> {
    try {
      const { idStudent, title, description } = req.body

      const createNewWarningService = container.resolve(CreateNewWarningService)
      const warning = await createNewWarningService.execute({
        idStudent,
        title,
        description,
      })

      const updateWarningsAmount = container.resolve(UpdateWarningsAmount)
      await updateWarningsAmount.execute(idStudent)

      return res.status(201).json({
        item: warning,
        message: 'Advertência cadastrada com sucesso.',
      })
    } catch (err) {
      return res.status(400).json({
        error: err,
        message: 'Erro ao tentar cadastrar nova advertência',
      })
    }
  }

  async listWarnings(req: Request, res: Response): Promise<Response> {
    try {
      const { idStudent } = req.params

      const listWarningsService = container.resolve(ListWarningsService)
      const warnings = await listWarningsService.execute(idStudent)

      return res.status(200).json({
        success: true,
        title: 'Sucesso',
        message: 'Busca de advertências concluída com sucesso.',
        items: warnings,
      })
    } catch (err) {
      return res.status(400).json({
        success: false,
        title: 'Erro ao tentar buscar advertências.',
        message: err.message,
        error: err,
      })
    }
  }
}
