import { inject, injectable } from 'tsyringe'
import { Types } from 'mongoose'

import { User } from '../../../entities/user'
import { AppError } from '../../../shared/errors/AppError'
import { ISubjectsRepository } from '../../../repositories/Subjects/ISubjectsRepository'

@injectable()
export class ListStudentsBySubjectService {
  subjectsRepository: ISubjectsRepository
  constructor(
    @inject('SubjectsRepository') subjectsRepository: ISubjectsRepository,
  ) {
    this.subjectsRepository = subjectsRepository
  }

  async execute(idSubject: string): Promise<User[] | Types.ObjectId[]> {
    if (!idSubject) throw new AppError('_id da disciplina não enviado')

    const subject = await this.subjectsRepository.findById(idSubject)

    return subject.students
  }
}
