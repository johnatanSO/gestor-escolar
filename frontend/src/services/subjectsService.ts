import http from '../api/http'

export const subjectsService = {
  getAll() {
    return http.get('/subjects/')
  },
  async create({ newSubjectData }: any) {
    const body = {
      ...newSubjectData,
    }
    return await http.post('/subjects/', {
      ...body,
    })
  },
  update({ subjectData }: any) {
    return http.put('/subjects/')
  },
  delete({ idSubject }: any) {
    return http.delete('/subjects/')
  },
}
