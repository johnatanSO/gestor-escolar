import { IUsersRepository } from '../../../repositories/Users/IUsersRepository'
import { inject, injectable } from 'tsyringe'
import { deleteFile } from '../../../utils/file'
import { AppError } from '../../../shared/errors/AppError'

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
    if (!userId) throw new AppError('_id do usuário não informado')
    if (!avatarFile) throw new AppError('Avatar não informado')

    const user = await this.usersRepository.findById(userId)

    if (!user) throw new AppError('Usuário inválido')

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
