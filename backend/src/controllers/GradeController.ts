import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListGradesBySubjectService } from '../useCases/Grades/ListGradesBySubject/ListGradesBySubjectService.service'
import { ListGradesByStudentService } from '../useCases/Grades/ListGradesByStudent/ListGradesByStudentService.service'
import { UpdateGradesService } from '../useCases/Grades/UpdateGrades/UpdateGradesService.service'

export class GradeController {
  async listBySubject(req: Request, res: Response): Promise<Response> {
    const { idSubject } = req.params

    const listGradesBySubjectService = container.resolve(ListGradesBySubjectService)
    const grades = await listGradesBySubjectService.execute(idSubject)

    return res.status(200).json({
      success: true,
      title: 'Busca de notas feita com sucesso',
      items: grades,
    })
  }

  async listByStudent(req: Request, res: Response): Promise<Response> {
    const { idStudent } = req.params

    const listGradesByStudentService = container.resolve(ListGradesByStudentService)
    const grades = await listGradesByStudentService.execute(idStudent)

    return res.status(200).json({
      success: true,
      title: 'Busca de notas feita com sucesso',
      items: grades,
    })
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { idGrade } = req.params
    const { firstGrade, secondGrade } = req.body

    const updateGradesService = container.resolve(UpdateGradesService)

    await updateGradesService.execute({
      idGrade,
      firstGrade,
      secondGrade,
    })

    return res.status(201).json({
      success: true,
      message: 'Notas atualizadas com sucesso',
    })
  }
}
