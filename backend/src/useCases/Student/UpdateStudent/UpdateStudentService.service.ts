import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../../repositories/Users/IUsersRepository'

interface IRequest {
  _id: string
  name: string
  email: string
  password: string
}

@injectable()
export class UpdateStudentService {
  usersRepository: IUsersRepository
  constructor(@inject('UsersRepository') usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ _id, name, email, password }: IRequest): Promise<void> {
    const filters = {
      _id,
    }

    const updateFields = {
      $set: {
        name,
        email,
        password,
      },
    }

    await this.usersRepository.update(filters, updateFields)
  }
}
