import { Grade } from '../../../entities/grade'
import { IGradesRepository } from './../../../repositories/Grades/IGradesRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ListGradesService {
  gradesRepository: IGradesRepository
  constructor(@inject('GradesRepository') gradesRepository: IGradesRepository) {
    this.gradesRepository = gradesRepository
  }

  async execute(idSubject: string): Promise<Grade[]> {
    const grades = await this.gradesRepository.listBySubject(idSubject)
    return grades
  }
}
