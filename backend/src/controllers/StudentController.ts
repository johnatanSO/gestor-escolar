import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListStudentsService } from '../useCases/Student/ListStudents/ListStudentsService.service'
import { ListAllStudentsGradesService } from '../useCases/Student/ListAllStudentsGrades/ListAllStudentsGradesService.service'
import { ListSingleStudentGrades } from '../useCases/Student/ListSingleStudentGrades/ListSingleStudentGrades.service'
import { UpdateGradesService } from '../useCases/Student/UpdateGrades/UpdateGradesService.service'
import { DeleteStudentService } from '../useCases/Student/DeleteStudentService/DeleteStudentService.service'
import { CreateNewUserService } from '../useCases/User/CreateNewUser/CreateNewUserService.service'
import { CreateNewStudentService } from '../useCases/Student/CreateNewStudent/CreateNewStudentService.service'
import { DeleteUserService } from '../useCases/User/DeleteUserService/DeleteUserService.service'
import { UpdateStudentService } from '../useCases/Student/UpdateStudent/UpdateStudentService.service'

export class StudentController {
  async listStudents(req: Request, res: Response): Promise<Response> {
    try {
      const idTeacher = req.user._id
      const listStudentsService = container.resolve(ListStudentsService)
      const students = await listStudentsService.execute({ idTeacher })

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

  async deleteStudent(req: Request, res: Response): Promise<Response> {
    const { studentId } = req.params

    const deleteStudentService = container.resolve(DeleteStudentService)
    await deleteStudentService.execute(studentId)

    const deleteUserService = container.resolve(DeleteUserService)
    await deleteUserService.execute(studentId)

    return res.status(200).json({
      success: true,
      message: 'Aluno removido com sucesso',
    })
  }

  async createNewStudent(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password } = req.body
      const idTeacher = req.user._id

      const createNewUserService = container.resolve(CreateNewUserService)
      const newUser = await createNewUserService.execute({
        name,
        email,
        password,
        occupation: 'student',
      })

      const createNewStudentService = container.resolve(CreateNewStudentService)
      await createNewStudentService.execute({
        _id: newUser._id,
        idTeacher,
      })

      delete newUser.password
      delete newUser._id

      return res.status(201).json({
        success: true,
        title: 'Aluno cadastrado com sucesso',
        item: newUser,
      })
    } catch (err) {
      return res.status(400).json({
        success: false,
        title: 'Erro ao tentar cadastrar aluno',
        message: err.message,
      })
    }
  }

  async updateStudent(req: Request, res: Response): Promise<Response> {
    const { _id, name, email, password } = req.body

    const updateStudentService = container.resolve(UpdateStudentService)
    await updateStudentService.execute({ _id, name, email, password })

    return res.status(201).json({
      success: true,
      message: 'Dados do aluno atualizados com sucesso',
    })
  }
}
