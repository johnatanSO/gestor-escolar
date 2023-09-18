import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListStudentsService } from '../useCases/Student/ListStudents/ListStudentsService.service'
import { ListAllStudentsGradesService } from '../useCases/Student/ListAllStudentsGrades/ListAllStudentsGradesService.service'
import { ListSingleStudentGrades } from '../useCases/Student/ListSingleStudentGrades/ListSingleStudentGrades.service'
import { UpdateGradesService } from '../useCases/Student/UpdateGrades/UpdateGradesService.service'

export class StudentController {
  async listStudents(req: Request, res: Response): Promise<Response> {
    try {
      const listStudentsService = container.resolve(ListStudentsService)
      const students = await listStudentsService.execute()

      return res.status(200).json({
        items: students,
        message: 'Busca concluída com sucesso.',
      })
    } catch (err) {
      console.log('ERR', err)
      return res.status(400).json({
        error: err,
        title: 'Erro ao tentar buscar alunos.',
        message: err.message,
      })
    }
  }

  async listAllStudentsGrades(req: Request, res: Response): Promise<Response> {
    try {
      const { idSubject } = req.params

      const listAllStudentsGradesService = container.resolve(
        ListAllStudentsGradesService,
      )
      const studentsGrades = await listAllStudentsGradesService.execute(
        idSubject,
      )

      return res.status(200).json({
        items: studentsGrades,
        message: 'Busca de notas concluída com sucesso.',
      })
    } catch (err) {
      return res
        .status(400)
        .json({ error: err, message: 'Erro ao tentar buscar notas.' })
    }
  }

  async listSingleStudentGrades(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const { idStudent } = req.params

      const listSingleStudentGrades = container.resolve(ListSingleStudentGrades)
      const studentGrades = await listSingleStudentGrades.execute(idStudent)

      return res.status(200).json({
        items: studentGrades,
        message: 'Busca de notas concluída com sucesso.',
      })
    } catch (err) {
      return res
        .status(400)
        .json({ error: err, message: 'Erro ao tentar buscar notas.' })
    }
  }

  async updateGrades(req: Request, res: Response): Promise<Response> {
    try {
      const { studentId, subjectId, grades } = req.body

      const updateGradesService = container.resolve(UpdateGradesService)
      await updateGradesService.execute({
        studentsIds: [studentId],
        subjectId,
        grades,
      })

      return res.status(204).json({
        message: 'Notas atualizadas com sucesso.',
      })
    } catch (err) {
      return res.status(400).json({
        error: err,
        message: 'Erro ao tentar atualizar notas.',
      })
    }
  }
}
