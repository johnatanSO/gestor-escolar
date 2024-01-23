import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListAllSubjectsService } from '../useCases/Subject/ListAllSubjects/ListAllSubjectsService.service'
import { CreateNewSubjectService } from '../useCases/Subject/CreateNewSubject/CreateNewSubjectService.service'
import { DeleteSubjectService } from '../useCases/Subject/DeleteSubject/DeleteSubjectService.service'
import { InsertStudentsInSubjectService } from '../useCases/Subject/InsertStudentInSubject/InsertStudentsInSubjectService.service'

export class SubjectController {
  async listAllSubjects(req: Request, res: Response): Promise<Response> {
    const { _id: idTeacher } = req.user

    const listAllSubjectsService = container.resolve(ListAllSubjectsService)
    const subjects = await listAllSubjectsService.execute({ idTeacher })

    return res.status(200).json({
      success: true,
      message: 'Busca de disciplinas concluída com sucesso',
      items: subjects,
    })
  }

  async createNewSubject(req: Request, res: Response): Promise<Response> {
    const { name } = req.body
    const { _id: idTeacher } = req.user

    const createNewSubjectService = container.resolve(CreateNewSubjectService)
    const newSubject = await createNewSubjectService.execute({
      name,
      idTeacher,
    })

    return res.status(201).json({
      success: true,
      item: newSubject,
      message: 'Disciplina cadastrada com sucesso.',
    })
  }

  async deleteSubject(req: Request, res: Response): Promise<Response> {
    const { idSubject } = req.params

    const deleteSubjectService = container.resolve(DeleteSubjectService)
    await deleteSubjectService.execute(idSubject)

    return res.status(202).json({
      success: true,
      message: 'Disciplina excluída com sucesso',
    })
  }

  async insertStudents(req: Request, res: Response): Promise<Response> {
    const { idSubject } = req.params
    const { studentsIds } = req.body

    const insertStudentsInSubjectService = container.resolve(
      InsertStudentsInSubjectService,
    )

    await insertStudentsInSubjectService.execute({
      studentsIds,
      idSubject,
    })

    return res.status(202).json({
      message: 'Estudante(s) foram inseridos na disciplina com sucesso.',
    })
  }
}
