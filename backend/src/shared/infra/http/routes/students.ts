import { StudentController } from '../../../../controllers/StudentController'
import express from 'express'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const studentsRoutes = express.Router()
const studentController = new StudentController()

studentsRoutes.get('/', ensureAuthenticated, studentController.listAll)

studentsRoutes.put(
  '/updateGrades',
  ensureAuthenticated,
  studentController.updateGrades,
)

studentsRoutes.post(
  '/',
  ensureAuthenticated,
  studentController.createNewStudent,
)

studentsRoutes.delete(
  '/:idStudent',
  ensureAuthenticated,
  studentController.deleteStudent,
)

export { studentsRoutes }
