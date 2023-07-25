import {
  ISubjectsRepository,
  InsertStudentParams,
} from '../repositories/Subjects/ISubjectsRepository'

export class InsertStudentInSubjectService {
  subjectsRepository: ISubjectsRepository
  constructor(subjectsRepository: ISubjectsRepository) {
    this.subjectsRepository = subjectsRepository
  }

  async execute({ studentsIds, subjectId }: InsertStudentParams) {
    if (studentsIds.length === 0) {
      throw new Error('Nenhum aluno selecionado')
    }

    this.subjectsRepository.insertStudent({
      studentsIds,
      subjectId,
    })
  }
}
