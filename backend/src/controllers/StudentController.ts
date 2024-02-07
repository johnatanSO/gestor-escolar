import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListAllStudentsService } from '../useCases/Student/ListAllStudents/ListAllStudentsService.service'
import { CreateStudentService } from '../useCases/Student/CreateStudent/CreateStudentService.service'
import { DeleteStudentService } from '../useCases/Student/DeleteStudent/DeleteStudentService.service'

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

  async createNewStudent(req: Request, res: Response): Promise<Response> {
    const { _id: idTeacher } = req.user
    const { name, email, password } = req.body

    const createStudentService = container.resolve(CreateStudentService)

    const student = await createStudentService.execute({
      name,
      email,
      password,
      idTeacher,
    })

    return res.status(201).json({
      success: true,
      message: 'Aluno cadastrado com sucesso',
      item: student,
    })
  }

  async deleteStudent(req: Request, res: Response): Promise<Response> {
    const { idStudent } = req.params

    const deleteStudentService = container.resolve(DeleteStudentService)
    await deleteStudentService.execute(idStudent)

    return res.status(200).json({
      success: true,
      message: 'Aluno deletado com sucesso',
    })
  }
}
