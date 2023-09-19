import { inject, injectable } from 'tsyringe'
import { IStudentsRepository } from '../../../repositories/Students/IStudentsRepository'
import { IStudent } from '../../../entities/student'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  idTeacher: string
}

@injectable()
export class ListStudentsService {
  studentsRepository: IStudentsRepository
  constructor(
    @inject('StudentsRepository') studentsRepository: IStudentsRepository,
  ) {
    this.studentsRepository = studentsRepository
  }

  async execute({ idTeacher }: IRequest): Promise<IStudent[]> {
    if (!idTeacher) throw new AppError('_id do professor não enviado')

    const students = await this.studentsRepository.list({ idTeacher })

    return students
  }
}
