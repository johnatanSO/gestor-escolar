import express, { Request, Response } from 'express'
import { SubjectsRepository } from '../repositories/Subjects/SubjectsRepository'
import { CreateNewSubjectService } from '../services/CreateNewSubjectService.service'
import { DeleteSubjectService } from '../services/DeleteSubjectService.service'
import { InsertStudentInSubjectService } from '../services/InsertStudentInSubjectService.service'
const subjectsRoutes = express.Router()

const subjectsRepository = new SubjectsRepository()

subjectsRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const subjects = await subjectsRepository.list()

    res.status(200).json({
      items: subjects,
      message: 'Busca concluída com sucesso',
    })
  } catch (err) {
    res
      .status(400)
      .json({ error: err, message: 'Erro ao tentar realizar busca' })
  }
})

subjectsRoutes.post('/', async (req: Request, res: Response) => {
  try {
    const { name } = req.body
    const createNewSubjectService = new CreateNewSubjectService(
      subjectsRepository,
    )
    const newSubject = await createNewSubjectService.execute({
      name,
    })

    res.status(201).json({
      item: newSubject,
      message: 'Disciplina cadastrada com sucesso.',
    })
  } catch (err) {
    res
      .status(400)
      .json({ error: err, message: 'Erro ao tentar cadastrar disciplina' })
  }
})

subjectsRoutes.delete('/', async (req: Request, res: Response) => {
  try {
    const { idSubject } = req.query as any
    const deleteSubjectService = new DeleteSubjectService(subjectsRepository)
    await deleteSubjectService.execute(idSubject)

    res.status(202).json({
      message: 'Disciplina excluída com sucesso',
    })
  } catch (err) {
    res
      .status(400)
      .json({ error: err, message: 'Erro ao tentar excluír disciplina' })
  }
})

subjectsRoutes.put('/insertStudents', async (req: Request, res: Response) => {
  try {
    const { studentsIds, subjectId } = req.body as any
    const insertStudentInSubjectService = new InsertStudentInSubjectService(
      subjectsRepository,
    )
    await insertStudentInSubjectService.execute({
      studentsIds,
      subjectId,
    })

    res.status(202).json({
      message: 'Estudante(s) foram inseridos na disciplina com sucesso.',
    })
  } catch (err) {
    res.status(400).json({
      error: err,
      message: 'Erro ao tentar inserir estudantes na discuplina.',
    })
  }
})

export { subjectsRoutes }
