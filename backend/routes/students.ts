import express, { Request, Response } from 'express'
import { StudentsRepository } from '../repositories/Students/StudentsRepository'
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

export { studentsRoutes }
