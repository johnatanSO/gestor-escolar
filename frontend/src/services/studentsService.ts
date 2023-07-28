import http from '../api/http'
import { NewSubjectData } from '../screens/Subjects/ModalCreateNewSubject'

interface CreateParams {
  newSubjectData: NewSubjectData
}

interface UpdateParams {
  subjectData: NewSubjectData
}

interface DeleteParams {
  idSubject: string
}

export const studentsService = {
  async getAll() {
    return await http.get('/students/')
  },

  async create({ newSubjectData }: CreateParams) {
    const body = {
      ...newSubjectData,
    }
    return await http.post('/subjects/', {
      ...body,
    })
  },

  update({ subjectData }: UpdateParams) {
    return http.put('/subjects/')
  },

  async delete({ idSubject }: DeleteParams) {
    return await http.delete('/subjects/', {
      params: { idSubject },
    })
  },
}
