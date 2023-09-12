import express from 'express'
import { SubjectController } from '../controllers/SubjectController'

const subjectsRoutes = express.Router()
const subjectController = new SubjectController()

subjectsRoutes.get('/', subjectController.listAllSubjectsService)

subjectsRoutes.post('/', subjectController.createNewSubject)

subjectsRoutes.delete('/', subjectController.deleteSubject)

subjectsRoutes.put('/insertStudents', subjectController.insertStudents)

export { subjectsRoutes }
