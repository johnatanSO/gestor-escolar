import http from '../api/http'
import { NewSubjectData } from '../screens/Teacher/Subjects/ModalCreateNewSubject'

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
  selectedStudentsIdsToAdd: string[]
  subjectId: string
}
interface RemoveStudentsParams {
  selectedStudentsIdsToRemove: string[]
  subjectId: string
}

export const subjectsService = {
  getAll() {
    return http.get('/subjects/')
  },

  create({ newSubjectData }: CreateParams) {
    const body = {
      ...newSubjectData,
    }
    return http.post('/subjects/', {
      ...body,
    })
  },

  update({ subjectData }: UpdateParams) {
    return http.put('/subjects/')
  },

  delete({ idSubject }: DeleteParams) {
    return http.delete('/subjects/' + idSubject)
  },

  insertStudents({
    selectedStudentsIdsToAdd,
    subjectId,
  }: InsertStudentsParams) {
    const body = {
      studentsIds: selectedStudentsIdsToAdd,
    }
    return http.put(`/subjects/insertStudents/${subjectId}`, {
      ...body,
    })
  },

  removeStudents({
    selectedStudentsIdsToRemove,
    subjectId,
  }: RemoveStudentsParams) {
    const body = {
      studentsIds: selectedStudentsIdsToRemove,
    }

    return http.put(`/subjects/removeStudents/${subjectId}`, {
      ...body,
    })
  },
}
