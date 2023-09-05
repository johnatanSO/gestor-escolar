import express from 'express'
import { SubjectsRepository } from '../repositories/Subjects/SubjectsRepository'
import { StudentsRepository } from '../repositories/Students/StudentsRepository'
import { SubjectController } from '../controllers/SubjectController'
import { InsertStudentInSubjectService } from '../useCases/Subject/InsertStudentInSubjectService.service'
import { DeleteSubjectService } from '../useCases/Subject/DeleteSubjectService.service'

const subjectsRoutes = express.Router()

const subjectsRepository = new SubjectsRepository()
const studentsRepository = new StudentsRepository()

const subjectController = new SubjectController()

subjectsRoutes.get('/', subjectController.listAllSubjectsService)

subjectsRoutes.post('/', subjectController.createNewSubject)

subjectsRoutes.delete('/', async (req, res) => {
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

subjectsRoutes.put('/insertStudents', async (req, res) => {
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
