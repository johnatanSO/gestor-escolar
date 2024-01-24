import { inject, injectable } from 'tsyringe'
import { IGradesRepository } from '../../../repositories/Grades/IGradesRepository'

interface IRequest {
  idGrade: string
  firstGrade: number
  secondGrade: number
}

@injectable()
export class UpdateGradesService {
  gradesRepository: IGradesRepository
  constructor(@inject('GradesRepository') gradesRepository: IGradesRepository) {
    this.gradesRepository = gradesRepository
  }

  async execute({ firstGrade, secondGrade, idGrade }: IRequest): Promise<void> {
    const fields = {
      firstGrade,
      secondGrade,
    }

    await this.gradesRepository.update({ idGrade, fields })
  }
}
