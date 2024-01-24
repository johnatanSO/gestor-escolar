import http from '../api/http'
import { NewWarning } from '../screens/Teacher/StudentsWarnings/ModalWarnings'

interface CreateParams {
  idStudent: string
  newWarningData: NewWarning
}

export const warningsService = {
  create({ idStudent, newWarningData }: CreateParams) {
    const body = {
      ...newWarningData,
    }

    return http.post(`/warnings/${idStudent}`, {
      ...body,
    })
  },

  getAll(idStudent: string) {
    return http.get('/warnings/' + idStudent)
  },
}
