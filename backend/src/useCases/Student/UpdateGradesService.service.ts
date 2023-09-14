import { inject, injectable } from 'tsyringe'
import {
  IStudentsRepository,
  IUpdateGradesDTO,
} from '../../repositories/Students/IStudentsRepository'

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
      throw new Error('Nenhuma disciplina selecionada.')
    }
    if (!studentsIds || studentsIds?.length === 0) {
      throw new Error('Nenhuma aluno selecionado.')
    }

    await this.studentsRepository.updateGrades({
      studentsIds,
      subjectId,
      grades,
    })
  }
}
