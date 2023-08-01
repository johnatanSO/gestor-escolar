import express, { Request, Response } from 'express'
import { StudentsRepository } from '../repositories/Students/StudentsRepository'
import { UpdateGradesService } from '../services/UpdateGradesService.service'
import { SubjectsRepository } from '../repositories/Subjects/SubjectsRepository'
const studentsRoutes = express.Router()

const studentsRepository = new StudentsRepository()
const subjectsRepository = new SubjectsRepository()

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
  '/getBySubject/:idSubject',
  async (req: Request, res: Response) => {
    try {
      const { idSubject } = req.params

      const subject = await subjectsRepository.findById(idSubject)

      const students = await studentsRepository.list({
        _id: { $in: subject.students },
      })
      const studentsFormated = students.map((student: any) => {
        const grades = student?.grades?.find(
          (grade: any) => grade?._id === idSubject,
        )
        return {
          ...student,
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

studentsRoutes.put('/updateGrades', async (req: Request, res: Response) => {
  try {
    const { studentId, subjectId, grades } = req.body

    const updateGradesService = new UpdateGradesService(studentsRepository)
    await updateGradesService.execute({
      studentsIds: [studentId],
      subjectId,
      grades,
    })

    res.status(202).json({
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
