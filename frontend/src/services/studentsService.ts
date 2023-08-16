import http from '../api/http'
import { usersService } from './usersService'

interface UpdateParams {
  studentId: string
  subjectId: string
  grades: any
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
}
