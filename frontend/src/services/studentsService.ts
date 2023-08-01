import http from '../api/http'

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
    return await http.get('/students/getBySubject/' + idSubject)
  },

  async updateGrades({ studentId, subjectId, grades }: UpdateParams) {
    const body = {
      studentId,
      subjectId,
      grades,
    }

    return http.put('/students/updateGrades', {
      ...body,
    })
  },
}
