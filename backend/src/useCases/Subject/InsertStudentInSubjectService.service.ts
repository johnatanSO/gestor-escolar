import { UpdateGradesService } from './../Student/UpdateGradesService.service'
import { container, inject, injectable } from 'tsyringe'
import {
  ISubjectsRepository,
  IInsertStudentDTO,
} from '../../repositories/Subjects/ISubjectsRepository'

@injectable()
export class InsertStudentInSubjectService {
  subjectsRepository: ISubjectsRepository
  constructor(
    @inject('SubjectsRepository') subjectsRepository: ISubjectsRepository,
  ) {
    this.subjectsRepository = subjectsRepository
  }

  async execute({ studentsIds, subjectId }: IInsertStudentDTO): Promise<void> {
    if (!subjectId) {
      throw new Error('Nenhuma disciplina selecionada.')
    }

    await this.subjectsRepository.insertStudent({
      studentsIds,
      subjectId,
    })

    // Definindo nota inicial do aluno como zero.
    const updateGradesService = container.resolve(UpdateGradesService)
    await updateGradesService.execute({
      studentsIds,
      subjectId,
      grades: {
        firstGrade: 0,
        secondGrade: 0,
      },
    })
  }
}
