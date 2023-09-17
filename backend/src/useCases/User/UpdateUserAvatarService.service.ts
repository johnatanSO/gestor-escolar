import { IUsersRepository } from '../../repositories/Users/IUsersRepository'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  userId: string
  avatarFile: string
}

@injectable()
export class UpdateUserAvatarService {
  usersRepository: IUsersRepository
  constructor(@inject('UsersRepository') usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ userId, avatarFile }: IRequest): Promise<void> {
    const filters = {
      _id: userId,
    }
    const updateFields = {
      $set: {
        avatar: avatarFile,
      },
    }

    await this.usersRepository.update(filters, updateFields)
  }
}
