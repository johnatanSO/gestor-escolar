import http from '../api/http'
import { NewSubjectData } from '../screens/Teacher/InsertStudents/ModalCreateNewSubject'

interface CreateParams {
  newSubjectData: NewSubjectData
}

interface UpdateParams {
  subjectData: NewSubjectData
}

interface DeleteParams {
  idSubject: string
}

interface InsertStudentsParams {
  selectedStudentsIds: string[]
  subjectId: string
}

export const subjectsService = {
  async getAll() {
    return await http.get('/subjects/')
  },

  async create({ newSubjectData }: CreateParams) {
    const body = {
      ...newSubjectData,
    }
    return await http.post('/subjects/', {
      ...body,
    })
  },

  async update({ subjectData }: UpdateParams) {
    return http.put('/subjects/')
  },

  async delete({ idSubject }: DeleteParams) {
    return await http.delete('/subjects/', {
      params: { idSubject },
    })
  },

  async insertStudents({
    selectedStudentsIds,
    subjectId,
  }: InsertStudentsParams) {
    const body = {
      studentsIds: selectedStudentsIds,
      subjectId,
    }
    return http.put('/subjects/insertStudents', {
      ...body,
    })
  },
}
