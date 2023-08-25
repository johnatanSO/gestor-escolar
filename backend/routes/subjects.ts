import { ListAllSubjectsService } from './../services/ListAllSubjectsService.service'
import express, { Request, Response } from 'express'
import { SubjectsRepository } from '../repositories/Subjects/SubjectsRepository'
import { CreateNewSubjectService } from '../services/CreateNewSubjectService.service'
import { DeleteSubjectService } from '../services/DeleteSubjectService.service'
import { InsertStudentInSubjectService } from '../services/InsertStudentInSubjectService.service'
import { StudentsRepository } from '../repositories/Students/StudentsRepository'

const subjectsRoutes = express.Router()

const subjectsRepository = new SubjectsRepository()
const studentsRepository = new StudentsRepository()

subjectsRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const listAllSubjectsService = new ListAllSubjectsService(
      subjectsRepository,
    )
    const subjects = await listAllSubjectsService.execute()

    res.status(200).json({
      success: true,
      title: 'Sucesso',
      message: 'Busca de disciplinas concluída com sucesso',
      items: subjects,
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      title: 'Erro ao tentar realizar busca disciplinas',
      message: err.message,
      error: err,
    })
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
      studentsRepository,
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
