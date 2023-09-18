import { inject, injectable } from 'tsyringe'
import { IStudentsRepository } from '../../../repositories/Students/IStudentsRepository'
import { IStudent } from '../../../entities/student'

@injectable()
export class ListStudentsService {
  studentsRepository: IStudentsRepository
  constructor(
    @inject('StudentsRepository') studentsRepository: IStudentsRepository,
  ) {
    this.studentsRepository = studentsRepository
  }

  async execute(): Promise<IStudent[]> {
    return await this.studentsRepository.list({})
  }
}
