import { IUsersRepository } from '../../repositories/Users/IUsersRepository'
import { inject, injectable } from 'tsyringe'
import { deleteFile } from '../../utils/file'

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
    const user = await this.usersRepository.findById(userId)

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`)
    }

    const filters = {
      _id: userId,
    }

    const avatarUrl = `users/avatar/${avatarFile}`

    const updateFields = {
      $set: {
        avatar: avatarUrl,
      },
    }

    await this.usersRepository.update(filters, updateFields)
  }
}
