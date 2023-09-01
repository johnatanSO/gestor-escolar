import {
  IStudentsRepository,
  UpdateGradesParams,
} from '../repositories/Students/IStudentsRepository'

export class UpdateGradesService {
  studentsRepository: IStudentsRepository
  constructor(studentsRepository: IStudentsRepository) {
    this.studentsRepository = studentsRepository
  }

  async execute({ studentsIds, subjectId, grades }: UpdateGradesParams) {
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
