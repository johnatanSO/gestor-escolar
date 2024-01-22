import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListAllStudentsService } from '../useCases/Student/ListAllStudents/ListAllStudentsService.service'

export class StudentController {
  async listAll(req: Request, res: Response): Promise<Response> {
    const { _id: idTeacher } = req.user

    const listAllStudentsService = container.resolve(ListAllStudentsService)
    const students = await listAllStudentsService.execute(idTeacher)

    return res.status(200).json({
      success: true,
      message: 'Busca de alunos feita com sucesso',
      items: students,
    })
  }
}
