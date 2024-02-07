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

  saveCall(students: IStudent[]) {
    return http.post('/calls', {
      students,
    })
  },

  updateCall({ idCall, students }: IUpdateCall) {
    return http.put(`/calls/${idCall}`, {
      students,
    })
  },
}
