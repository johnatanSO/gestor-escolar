import { inject, injectable } from 'tsyringe'
import { IStudentsRepository } from '../../../repositories/Students/IStudentsRepository'
import { AppError } from '../../../errors/AppError'

@injectable()
export class UpdateWarningsAmount {
  studentsRepository: IStudentsRepository
  constructor(
    @inject('StudentsRepository') studentsRepository: IStudentsRepository,
  ) {
    this.studentsRepository = studentsRepository
  }

  async execute(idStudent: string): Promise<void> {
    if (!idStudent) throw new AppError('_id do aluno não foi informado')

    const filters = {
      _id: idStudent,
    }

    const updateFields = {
      $inc: {
        warningsAmount: 1,
      },
    }

    await this.studentsRepository.update({ filters, updateFields })
  }
}
