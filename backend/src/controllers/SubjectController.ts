import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListAllSubjectsService } from '../useCases/Subject/ListAllSubjectsService.service'
import { CreateNewSubjectService } from '../useCases/Subject/CreateNewSubjectService.service'

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

  async createNewSubject(req: Request, res: Response): Promise<Response> {
    try {
      const { name } = req.body
      const createNewSubjectService = container.resolve(CreateNewSubjectService)
      const newSubject = await createNewSubjectService.execute({
        name,
      })

      return res.status(201).json({
        item: newSubject,
        message: 'Disciplina cadastrada com sucesso.',
      })
    } catch (err) {
      return res
        .status(400)
        .json({ error: err, message: 'Erro ao tentar cadastrar disciplina' })
    }
  }
}
