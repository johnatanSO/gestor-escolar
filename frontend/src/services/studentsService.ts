import { NewStudentData } from './../screens/Teacher/Students/ModalCreateNewStudent/index'
import http from '../api/http'
import { usersService } from './usersService'

interface DeleteStudentParams {
  studentId: string
}

interface CreateParams {
  newStudentData: NewStudentData
}

interface UpdateStudentParams {
  studentData: NewStudentData
}

export const studentsService = {
  getAll() {
    return http.get('/students/')
  },

  getBySubject(idSubject: string) {
    return http.get('/students/subjectStudentsGrades/' + idSubject)
  },

  getGrades() {
    const idStudent = usersService?.getUserInfo()?._id
    return http.get('/students/studentGrades/' + idStudent)
  },

  delete({ studentId }: DeleteStudentParams) {
    return http.delete(`/students/${studentId}`)
  },

  create({ newStudentData }: CreateParams) {
    const body = { ...newStudentData }

    return http.post('/students/', {
      ...body,
    })
  },

  updateStudent({ studentData }: UpdateStudentParams) {
    return http.put('/users/', {
      ...studentData,
    })
  },
}
