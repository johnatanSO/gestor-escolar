import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListGradesService } from '../useCases/Grades/ListGrades/ListGradesService.service'

export class GradeController {
  async list(req: Request, res: Response): Promise<Response> {
    const { idSubject } = req.params

    const listGradesService = container.resolve(ListGradesService)
    const grades = await listGradesService.execute(idSubject)

    return res.status(200).json({
      success: true,
      title: 'Busca de notas feita com sucesso',
      items: grades,
    })
  }
}
