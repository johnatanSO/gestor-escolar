import express from 'express'
import { StudentController } from '../controllers/StudentController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const studentsRoutes = express.Router()
const studentController = new StudentController()

// Midlewares
studentsRoutes.use(ensureAuthenticated)

// Routes
studentsRoutes.get('/', studentController.listStudents)

studentsRoutes.get(
  '/subjectStudentsGrades/:idSubject',
  studentController.listAllStudentsGrades,
)

studentsRoutes.get(
  '/studentGrades/:idStudent',
  studentController.listSingleStudentGrades,
)

studentsRoutes.put('/updateGrades', studentController.updateGrades)

export { studentsRoutes }
