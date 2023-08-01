import express, { Request, Response } from 'express'
import { StudentsRepository } from '../repositories/Students/StudentsRepository'
import { UpdateGradesService } from '../services/UpdateGradesService.service'
const studentsRoutes = express.Router()

const studentsRepository = new StudentsRepository()

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
      console.log('ID SUBJECT', idSubject)
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
  },
)

studentsRoutes.put('/updateGrades', async (req: Request, res: Response) => {
  try {
    const { studentId, subjectId, grades } = req.body as any

    const updateGradesService = new UpdateGradesService(studentsRepository)
    await updateGradesService.execute({
      studentsIds: [studentId],
      subjectId,
      grades,
    })

    res.status(202).json({
      message: 'Notas atualizadas com sucesso',
    })
  } catch (err) {
    res.status(400).json({
      error: err,
      message: 'Erro ao tentar inserir estudantes na discuplina.',
    })
  }
})

export { studentsRoutes }
