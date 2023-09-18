import { inject, injectable } from 'tsyringe'
import {
  ISubjectsRepository,
  IInsertStudentDTO,
} from '../../repositories/Subjects/ISubjectsRepository'

@injectable()
export class InsertStudentInSubjectService {
  subjectsRepository: ISubjectsRepository
  constructor(
    @inject('SubjectsRepository') subjectsRepository: ISubjectsRepository,
  ) {
    this.subjectsRepository = subjectsRepository
  }

  async execute({ studentsIds, subjectId }: IInsertStudentDTO): Promise<void> {
    if (!subjectId) {
      throw new Error('Nenhuma disciplina selecionada.')
    }

    await this.subjectsRepository.insertStudent({
      studentsIds,
      subjectId,
    })
  }
}
