import http from '../api/http'
import { usersService } from './usersService'

interface UpdateParams {
  studentId: string
  subjectId: string
  grades: any
}

interface DeleteStudentParams {
  studentId: string
}

interface CreateParams {
  // newStudentData: NewStudentData
  newStudentData: any
}

export const studentsService = {
  async getAll() {
    return await http.get('/students/')
  },

  async getBySubject(idSubject: string) {
    return await http.get('/students/subjectStudentsGrades/' + idSubject)
  },

  async updateGrades({ studentId, subjectId, grades }: UpdateParams) {
    const formatedGrades = {
      firstGrade: Number(grades?.firstGrade || 0),
      secondGrade: Number(grades?.secondGrade || 0),
    }
    const body = {
      studentId,
      subjectId,
      grades: formatedGrades,
    }

    return http.put('/students/updateGrades', {
      ...body,
    })
  },

  async getGrades() {
    const idStudent = usersService?.getUserInfo()?._id
    return await http.get('/students/studentGrades/' + idStudent)
  },

  async delete({ studentId }: DeleteStudentParams) {
    return await http.delete('/students/' + studentId)
  },

  async create({ newStudentData }: CreateParams) {
    const body = { ...newStudentData }

    return http.post('/students/', {
      ...body,
    })
  },
}
