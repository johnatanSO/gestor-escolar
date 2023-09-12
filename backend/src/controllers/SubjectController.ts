import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListAllSubjectsService } from '../useCases/Subject/ListAllSubjectsService.service'
import { CreateNewSubjectService } from '../useCases/Subject/CreateNewSubjectService.service'
import { DeleteSubjectService } from '../useCases/Subject/DeleteSubjectService.service'
import { InsertStudentInSubjectService } from '../useCases/Subject/InsertStudentInSubjectService.service'

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

  async deleteSubject(req: Request, res: Response): Promise<Response> {
    try {
      const { idSubject } = req.query as any
      const deleteSubjectService = container.resolve(DeleteSubjectService)
      await deleteSubjectService.execute(idSubject)

      return res.status(202).json({
        message: 'Disciplina excluída com sucesso',
      })
    } catch (err) {
      return res
        .status(400)
        .json({ error: err, message: 'Erro ao tentar excluír disciplina' })
    }
  }

  async insertStudents(req: Request, res: Response): Promise<Response> {
    try {
      const { studentsIds, subjectId } = req.body as any
      const insertStudentInSubjectService = container.resolve(
        InsertStudentInSubjectService,
      )
      await insertStudentInSubjectService.execute({
        studentsIds,
        subjectId,
      })

      return res.status(202).json({
        message: 'Estudante(s) foram inseridos na disciplina com sucesso.',
      })
    } catch (err) {
      return res.status(400).json({
        error: err,
        message: 'Erro ao tentar inserir estudantes na discuplina.',
      })
    }
  }
}