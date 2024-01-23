import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../../repositories/Users/IUsersRepository'

@injectable()
export class DeleteStudentService {
  usersRepository: IUsersRepository
  constructor(@inject('UsersRepository') usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(idStudent: string): Promise<void> {
    this.usersRepository.delete(idStudent)
  }
}
