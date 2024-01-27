import { Grade } from '../../../entities/grade'
import { IGradesRepository } from '../../../repositories/Grades/IGradesRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ListGradesByStudentService {
  gradesRepository: IGradesRepository
  constructor(@inject('GradesRepository') gradesRepository: IGradesRepository) {
    this.gradesRepository = gradesRepository
  }

  async execute(idStudent: string): Promise<Grade[]> {
    const grades = await this.gradesRepository.listByStudent(idStudent)
    return grades
  }
}
