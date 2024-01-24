import http from '../api/http'

interface UpdateParams {
  _id: string
  firstGrade: number
  secondGrade: number
}

export const gradesService = {
  getAll(idSubject: string) {
    return http.get(`/grades/${idSubject}`)
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
}
