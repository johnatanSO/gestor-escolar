import { inject, injectable } from 'tsyringe'
import {
  IStudentsRepository,
  Student,
} from '../../repositories/Students/IStudentsRepository'

@injectable()
export class ListStudentsService {
  studentsRepository: IStudentsRepository
  constructor(
    @inject('StudentsRepository') studentsRepository: IStudentsRepository,
  ) {
    this.studentsRepository = studentsRepository
  }

  async execute(): Promise<Student[]> {
    return await this.studentsRepository.list({})
  }
}
