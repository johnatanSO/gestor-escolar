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
    if (!subjectId) {
      throw new Error('Nenhuma disciplina selecionada.')
    }

    this.subjectsRepository.insertStudent({
      studentsIds,
      subjectId,
    })
  }
}
