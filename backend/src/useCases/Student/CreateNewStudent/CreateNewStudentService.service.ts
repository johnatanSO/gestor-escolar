import { inject, injectable } from 'tsyringe'
import { IStudentsRepository } from '../../../repositories/Students/IStudentsRepository'
import { Types } from 'mongoose'
import { IStudent } from '../../../entities/student'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  _id: Types.ObjectId
  idTeacher: string
}

@injectable()
export class CreateNewStudentService {
  studentsRepository: IStudentsRepository
  constructor(
    @inject('StudentsRepository') studentsRepository: IStudentsRepository,
  ) {
    this.studentsRepository = studentsRepository
  }

  async execute({ _id, idTeacher }: IRequest): Promise<IStudent> {
    const entries = await this.studentsRepository.getEntries(idTeacher)
    const code = (entries + 1).toString()

    if (!_id) throw new AppError('_id de referência do usuário não foi enviado')

    const studentCreated = await this.studentsRepository.create({
      code,
      user: _id,
      _id,
      idTeacher,
    })

    return studentCreated
  }
}
