import { inject, injectable } from 'tsyringe'
import { IStudentsRepository } from '../../../repositories/Students/IStudentsRepository'
import { AppError } from '../../../errors/AppError'

@injectable()
export class DeleteStudentService {
  studentsRepository: IStudentsRepository
  constructor(
    @inject('StudentsRepository') studentsRepository: IStudentsRepository,
  ) {
    this.studentsRepository = studentsRepository
  }

  async execute(idStudent: string): Promise<void> {
    const studentNotFound = await this.studentsRepository.findById(idStudent)

    if (!studentNotFound) {
      throw new AppError('Aluno não encontrado')
    }

    await this.studentsRepository.delete(idStudent)
  }
}
