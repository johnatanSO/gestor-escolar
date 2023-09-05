import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListAllSubjectsService } from '../useCases/Subject/ListAllSubjectsService.service'

export class SubjectController {
  async listAllSubjectsService(req: Request, res: Response): Promise<Response> {
    try {
      const listAllSubjectsService = container.resolve(ListAllSubjectsService)
      const subjects = await listAllSubjectsService.execute()

      return res.status(200).json({
        success: true,
        title: 'Sucesso',
        message: 'Busca de disciplinas concluída com sucesso',
        items: subjects,
      })
    } catch (err) {
      return res.status(400).json({
        success: false,
        title: 'Erro ao tentar realizar busca disciplinas',
        message: err.message,
        error: err,
      })
    }
  }
}
