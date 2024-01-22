import { StudentController } from '../../../../controllers/StudentController'
import express from 'express'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const studentsRoutes = express.Router()
const studentController = new StudentController()

studentsRoutes.get('/', ensureAuthenticated, studentController.listAll)

export { studentsRoutes }
