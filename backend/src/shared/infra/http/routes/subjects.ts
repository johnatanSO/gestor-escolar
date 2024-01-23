import express from 'express'
import { SubjectController } from '../../../../controllers/SubjectController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const subjectsRoutes = express.Router()
const subjectController = new SubjectController()

subjectsRoutes.get('/', ensureAuthenticated, subjectController.listAllSubjects)

subjectsRoutes.post(
  '/',
  ensureAuthenticated,
  subjectController.createNewSubject,
)

subjectsRoutes.delete(
  '/:idSubject',
  ensureAuthenticated,
  subjectController.deleteSubject,
)

subjectsRoutes.put(
  '/insertStudents/:idSubject',
  ensureAuthenticated,
  subjectController.insertStudents,
)

export { subjectsRoutes }
