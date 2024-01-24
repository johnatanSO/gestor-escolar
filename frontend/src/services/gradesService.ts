import http from '../api/http'

export const gradesService = {
  getAll(idSubject: string) {
    return http.get(`/grades/${idSubject}`)
  },
}
