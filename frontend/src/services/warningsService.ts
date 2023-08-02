import http from '../api/http'
import { NewWarning } from '../screens/StudentsWarnings/ModalWarnings'

interface CreateParams {
  studentId: string
  newWarningData: NewWarning
}

export const warningsService = {
  async create({ studentId, newWarningData }: CreateParams) {
    const body = {
      ...newWarningData,
      studentId,
    }
    return await http.post('/warnings/', {
      ...body,
    })
  },
}
