import { ListAllStudentsGradesService } from './../services/ListAllStudentsGradesService.service'
import { ListStudentsService } from './../services/ListStudentsService.service'
import express, { Request, Response } from 'express'
import { StudentsRepository } from '../repositories/Students/StudentsRepository'
import { UpdateGradesService } from '../services/UpdateGradesService.service'
import { SubjectsRepository } from '../repositories/Subjects/SubjectsRepository'
import { ListSingleStudentGrades } from '../services/ListSingleStudentGrades.service'

const studentsRoutes = express.Router()

const studentsRepository = new StudentsRepository()
const subjectsRepository = new SubjectsRepository()

studentsRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const listStudentsService = new ListStudentsService(studentsRepository)
    const students = await listStudentsService.execute()

    res.status(200).json({
      items: students,
      message: 'Busca concluída com sucesso.',
    })
  } catch (err) {
    res
      .status(400)
      .json({ error: err, message: 'Erro ao tentar buscar alunos.' })
  }
})

studentsRoutes.get(
  '/subjectStudentsGrades/:idSubject',
  async (req: Request, res: Response) => {
    try {
      const { idSubject } = req.params
      const listAllStudentsGradesService = new ListAllStudentsGradesService(
        subjectsRepository,
        studentsRepository,
      )

      const studentsGrades = listAllStudentsGradesService.execute(idSubject)

      res.status(200).json({
        items: studentsGrades,
        message: 'Busca de notas concluída com sucesso.',
      })
    } catch (err) {
      res
        .status(400)
        .json({ error: err, message: 'Erro ao tentar buscar notas.' })
    }
  },
)

studentsRoutes.get(
  '/studentGrades/:idStudent',
  async (req: Request, res: Response) => {
    try {
      const { idStudent } = req.params

      const listSingleStudentGrades = new ListSingleStudentGrades(
        subjectsRepository,
        studentsRepository,
      )

      const studentGrades = await listSingleStudentGrades.execute(idStudent)

      res.status(200).json({
        items: studentGrades,
        message: 'Busca de notas concluída com sucesso.',
      })
    } catch (err) {
      res
        .status(400)
        .json({ error: err, message: 'Erro ao tentar buscar notas.' })
    }
  },
)

studentsRoutes.put('/updateGrades', async (req: Request, res: Response) => {
  try {
    const { studentId, subjectId, grades } = req.body

    const updateGradesService = new UpdateGradesService(studentsRepository)
    await updateGradesService.execute({
      studentsIds: [studentId],
      subjectId,
      grades,
    })

    res.status(204).json({
      message: 'Notas atualizadas com sucesso.',
    })
  } catch (err) {
    res.status(400).json({
      error: err,
      message: 'Erro ao tentar atualizar notas.',
    })
  }
})

export { studentsRoutes }
