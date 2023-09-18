import { inject, injectable } from 'tsyringe'
import { IStudentsRepository } from '../../../repositories/Students/IStudentsRepository'
import { Types } from 'mongoose'
import { IStudent } from '../../../entities/student'

interface IRequest {
  name: string
  _id: Types.ObjectId
}

@injectable()
export class CreateNewStudentService {
  studentsRepository: IStudentsRepository
  constructor(
    @inject('StudentsRepository') studentsRepository: IStudentsRepository,
  ) {
    this.studentsRepository = studentsRepository
  }

  async execute({ name, _id }: IRequest): Promise<IStudent> {
    const entries = await this.studentsRepository.getEntries()
    const code = (entries + 1).toString()

    const studentCreated = await this.studentsRepository.create({
      code,
      name,
      _id,
    })

    return studentCreated
  }
}
