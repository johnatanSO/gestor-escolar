import express, { Request, Response } from 'express'
import { StudentsRepository } from '../repositories/Students/StudentsRepository'
import { UpdateGradesService } from '../services/UpdateGradesService.service'
import { SubjectsRepository } from '../repositories/Subjects/SubjectsRepository'
const studentsRoutes = express.Router()

const studentsRepository = new StudentsRepository()
const subjectsRepository = new SubjectsRepository()

// TO-DO: Mover formatação para service de estudantes
studentsRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const students = await studentsRepository.list()

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
      const subject = await subjectsRepository.findById(idSubject)
      const queryList = {
        _id: { $in: subject?.students },
      }

      const students = await studentsRepository.list(queryList)
      const studentsFormated = students.map((student: any) => {
        const grades = student?.grades?.find(
          (grade: any) => grade?._id === idSubject,
        )
        return {
          ...student._doc,
          grades,
        }
      })

      res.status(200).json({
        items: studentsFormated,
        message: 'Busca de alunos concluída com sucesso.',
      })
    } catch (err) {
      res
        .status(400)
        .json({ error: err, message: 'Erro ao tentar buscar alunos.' })
    }
  },
)

studentsRoutes.get(
  '/studentGrades/:idStudent',
  async (req: Request, res: Response) => {
    try {
      const { idStudent } = req.params
      const student = await studentsRepository.findById(idStudent)

      const queryListSubjects = {
        students: { $elemMatch: { $eq: idStudent } },
      }

      const subjects = await subjectsRepository.list(queryListSubjects)
      const grades = subjects.map((subject) => {
        const subjectGrades = student.grades.find(
          (grade) => grade._id === subject._id.toString(),
        )
        return {
          subjectGrades,
          subjectName: subject.name,
          subjectCode: subject.code,
        }
      })

      res.status(200).json({
        items: grades,
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
