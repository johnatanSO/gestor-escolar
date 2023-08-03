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
    return await http.get('/students/getGrades/' + idSubject)
  },

  async updateGrades({ studentId, subjectId, grades }: UpdateParams) {
    const formatedGrades = {
      firstGrade: Number(grades?.firstGrades),
      secondGrade: Number(grades?.secondGrade),
    }
    const body = {
      studentId,
      subjectId,
      grades: formatedGrades,
    }

    return http.put('/students/updateGrades', {
      ...body,
    })
  },
}
