import { inject, injectable } from 'tsyringe'
import {
  IStudentsRepository,
  IUpdateGradesDTO,
} from '../../../repositories/Students/IStudentsRepository'
import { AppError } from '../../../errors/AppError'

@injectable()
export class UpdateGradesService {
  studentsRepository: IStudentsRepository
  constructor(
    @inject('StudentsRepository') studentsRepository: IStudentsRepository,
  ) {
    this.studentsRepository = studentsRepository
  }

  async execute({
    studentsIds,
    subjectId,
    grades,
  }: IUpdateGradesDTO): Promise<void> {
    if (!subjectId) {
      throw new AppError('Nenhuma disciplina selecionada.')
    }
    if (!studentsIds || studentsIds?.length === 0) {
      throw new AppError('Nenhuma aluno selecionado.')
    }

    await this.studentsRepository.updateGrades({
      studentsIds,
      subjectId,
      grades,
    })
  }
}
