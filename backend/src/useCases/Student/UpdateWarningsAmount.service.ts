import { inject, injectable } from 'tsyringe'
import { IStudentsRepository } from '../../repositories/Students/IStudentsRepository'

@injectable()
export class UpdateWarningsAmount {
  studentsRepository: IStudentsRepository
  constructor(
    @inject('StudentsRepository') studentsRepository: IStudentsRepository,
  ) {
    this.studentsRepository = studentsRepository
  }

  async execute(idStudent: string): Promise<void> {
    const filters = {
      idStudent,
    }

    const updateFields = {
      $inc: {
        warningsAmount: 1,
      },
    }

    await this.studentsRepository.update({ filters, updateFields })
  }
}
