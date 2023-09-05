import { IStudentsRepository } from '../../repositories/Students/IStudentsRepository'
import {
  ISubjectsRepository,
  InsertStudentParams,
} from '../../repositories/Subjects/ISubjectsRepository'

export class InsertStudentInSubjectService {
  subjectsRepository: ISubjectsRepository
  studentsRepository: IStudentsRepository
  constructor(
    subjectsRepository: ISubjectsRepository,
    studentsRepository: IStudentsRepository,
  ) {
    this.subjectsRepository = subjectsRepository
    this.studentsRepository = studentsRepository
  }

  async execute({ studentsIds, subjectId }: InsertStudentParams) {
    if (!subjectId) {
      throw new Error('Nenhuma disciplina selecionada.')
    }

    this.subjectsRepository.insertStudent({
      studentsIds,
      subjectId,
    })
    this.studentsRepository.updateGrades({
      studentsIds,
      subjectId,
      grades: {
        firstGrade: 0,
        secondGrade: 0,
      },
    })
  }
}
