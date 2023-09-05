import express from 'express'
import { StudentController } from '../controllers/StudentController'

const studentsRoutes = express.Router()
const studentController = new StudentController()

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
