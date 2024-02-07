import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../../repositories/Users/IUsersRepository'

interface IRequest {
  name: string
  email: string
  password: string
  idUser: string
}

@injectable()
export class UpdateUserInfosService {
  usersRepository: IUsersRepository
  constructor(@inject('UsersRepository') usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ name, email, password, idUser }: IRequest): Promise<void> {
    await this.usersRepository.update(
      { _id: idUser },
      { name, email, password },
    )
  }
}
