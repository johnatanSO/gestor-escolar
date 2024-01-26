import { ListWarningsService } from '../useCases/Warning/ListWarnings/ListWarningsService.service'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateNewWarningService } from '../useCases/Warning/CreateNewWarning/CreateNewWarningService.service'

export class WarningController {
  async createNewWarning(req: Request, res: Response): Promise<Response> {
    const { idStudent } = req.params
    const { title, description } = req.body

    const createNewWarningService = container.resolve(CreateNewWarningService)
    const warning = await createNewWarningService.execute({
      idStudent,
      title,
      description,
    })

    return res.status(201).json({
      item: warning,
      message: 'Advertência cadastrada com sucesso.',
    })
  }

  async listWarnings(req: Request, res: Response): Promise<Response> {
    const { idStudent } = req.params

    const listWarningsService = container.resolve(ListWarningsService)
    const warnings = await listWarningsService.execute(idStudent)

    return res.status(200).json({
      success: true,
      message: 'Busca de advertências concluída com sucesso.',
      items: warnings,
    })
  }
}
