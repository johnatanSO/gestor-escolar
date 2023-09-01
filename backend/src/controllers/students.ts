import express from 'express'
import { ListAllStudentsGradesService } from '../useCases/ListAllStudentsGradesService.service'
import { ListStudentsService } from '../useCases/ListStudentsService.service'
import { StudentsRepository } from '../repositories/Students/StudentsRepository'
import { UpdateGradesService } from '../useCases/UpdateGradesService.service'
import { SubjectsRepository } from '../repositories/Subjects/SubjectsRepository'
import { ListSingleStudentGrades } from '../useCases/ListSingleStudentGrades.service'

const studentsRoutes = express.Router()

const studentsRepository = new StudentsRepository()
const subjectsRepository = new SubjectsRepository()

studentsRoutes.get('/', async (req, res) => {
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

studentsRoutes.get('/subjectStudentsGrades/:idSubject', async (req, res) => {
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
})

studentsRoutes.get('/studentGrades/:idStudent', async (req, res) => {
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
})

studentsRoutes.put('/updateGrades', async (req, res) => {
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
