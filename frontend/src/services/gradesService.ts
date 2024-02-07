import http from '../api/http'
import { usersService } from './usersService'

interface UpdateParams {
  _id: string
  firstGrade: number
  secondGrade: number
}

export const gradesService = {
  getAll(idSubject: string) {
    return http.get(`/grades/subject/${idSubject}`)
  },

  update({ _id: idGrade, firstGrade, secondGrade }: UpdateParams) {
    const body = {
      firstGrade,
      secondGrade,
    }

    return http.put(`/grades/${idGrade}`, {
      ...body,
    })
  },

  getGradesByStudent() {
    const studentId = usersService.getUserInfo()._id

    return http.get(`/grades/student/${studentId}`)
  },
}
