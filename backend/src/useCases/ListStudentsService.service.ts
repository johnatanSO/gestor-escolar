import { Student } from '../repositories/Students/IStudentsRepository'
import { StudentsRepository } from './../repositories/Students/StudentsRepository'

export class ListStudentsService {
  studentsRepository: StudentsRepository
  constructor(studentsRepository: StudentsRepository) {
    this.studentsRepository = studentsRepository
  }

  async execute(): Promise<Student[]> {
    return await this.studentsRepository.list()
  }
}
