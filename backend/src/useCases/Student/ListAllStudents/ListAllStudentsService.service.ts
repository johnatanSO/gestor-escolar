import { inject, injectable } from 'tsyringe'
import { User } from '../../../entities/user'
import { IUsersRepository } from '../../../repositories/Users/IUsersRepository'
import { AppError } from '../../../shared/errors/AppError'

@injectable()
export class ListAllStudentsService {
  usersRepository: IUsersRepository
  constructor(@inject('UsersRepository') usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(idTeacher: string): Promise<User[]> {
    if (!idTeacher) throw new AppError('_id do professor não enviado')

    const students = await this.usersRepository.listStudents(idTeacher)

    return students
  }
}
