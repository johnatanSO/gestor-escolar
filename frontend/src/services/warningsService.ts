import http from '../api/http'
import { NewWarning } from '../screens/Teacher/StudentsWarnings/ModalWarnings'

interface CreateParams {
  idStudent: string
  newWarningData: NewWarning
}

export const warningsService = {
  async create({ idStudent, newWarningData }: CreateParams) {
    const body = {
      ...newWarningData,
      idStudent,
    }
    return await http.post('/warnings/', {
      ...body,
    })
  },

  async getAll(idStudent: string) {
    return await http.get('/warnings/' + idStudent)
  },
}
