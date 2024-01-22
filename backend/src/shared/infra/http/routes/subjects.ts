import express from 'express'
import { SubjectController } from '../../../../controllers/SubjectController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const subjectsRoutes = express.Router()
const subjectController = new SubjectController()

subjectsRoutes.use(ensureAuthenticated)

subjectsRoutes.get('/', subjectController.listAllSubjects)

subjectsRoutes.post('/', subjectController.createNewSubject)

subjectsRoutes.delete('/', subjectController.deleteSubject)

// subjectsRoutes.put('/insertStudents', subjectController.insertStudents)

export { subjectsRoutes }
