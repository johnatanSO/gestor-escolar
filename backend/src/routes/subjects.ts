import express from 'express'
import { SubjectController } from '../controllers/SubjectController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const subjectsRoutes = express.Router()
const subjectController = new SubjectController()

// Middlewares
subjectsRoutes.use(ensureAuthenticated)

// Routes
subjectsRoutes.get('/', subjectController.listAllSubjectsService)

subjectsRoutes.post('/', subjectController.createNewSubject)

subjectsRoutes.delete('/', subjectController.deleteSubject)

subjectsRoutes.put('/insertStudents', subjectController.insertStudents)

export { subjectsRoutes }
