import { inject, injectable } from 'tsyringe'
import {
  ISubjectsRepository,
  IInsertStudentDTO,
} from '../../../repositories/Subjects/ISubjectsRepository'
import { AppError } from '../../../errors/AppError'

@injectable()
export class InsertStudentInSubjectService {
  subjectsRepository: ISubjectsRepository
  constructor(
    @inject('SubjectsRepository') subjectsRepository: ISubjectsRepository,
  ) {
    this.subjectsRepository = subjectsRepository
  }

  async execute({ studentsIds, subjectId }: IInsertStudentDTO): Promise<void> {
    if (!subjectId) throw new AppError('_id da disciplina não foi informado')

    await this.subjectsRepository.insertStudent({
      studentsIds,
      subjectId,
    })
  }
}
