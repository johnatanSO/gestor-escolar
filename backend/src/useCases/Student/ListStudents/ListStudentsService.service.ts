import { inject, injectable } from 'tsyringe'
import { IStudentsRepository } from '../../../repositories/Students/IStudentsRepository'
import { IStudent } from '../../../entities/student'

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
    return await this.studentsRepository.list({ idTeacher })
  }
}
