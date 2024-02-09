import http from '../api/http'

interface IStudent {
  _id: string
  present: boolean
}

interface IUpdateCall {
  idCall: string
  students: any[]
}

export const callsService = {
  getByDate(date: string) {
    return http.get(`/calls/${date}`)
  },

  finalizeCall(students: IStudent[], dateNow: string) {
    const studentsFormated = students.map(({ _id, present }) => {
      return {
        _id,
        present,
      }
    })
    return http.post(`/calls/${dateNow}`, {
      students: studentsFormated,
    })
  },

  updateCall({ idCall, students }: IUpdateCall) {
    return http.put(`/calls/${idCall}`, {
      students,
    })
  },
}
