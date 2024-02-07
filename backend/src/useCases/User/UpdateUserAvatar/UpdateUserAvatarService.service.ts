import { IUsersRepository } from '../../../repositories/Users/IUsersRepository'
import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../errors/AppError'
import { IStorageProvider } from '../../../shared/containers/providers/StorageProvider/IStorageProvider'

interface IRequest {
  userId: string
  avatarFile: string
}

@injectable()
export class UpdateUserAvatarService {
  usersRepository: IUsersRepository
  storageProvider: IStorageProvider

  constructor(
    @inject('UsersRepository') usersRepository: IUsersRepository,
    @inject('StorageProvider') storageProvider: IStorageProvider,
  ) {
    this.usersRepository = usersRepository
    this.storageProvider = storageProvider
  }

  async execute({ userId, avatarFile }: IRequest): Promise<void> {
    if (!userId) throw new AppError('_id do usuário não informado')
    if (!avatarFile) throw new AppError('Avatar não enviado')

    const user = await this.usersRepository.findById(userId)

    if (!user) throw new AppError('Usuário inválido')

    if (user.avatar) {
      await this.storageProvider.deleteImage(user.avatar, 'avatar')
    }

    const avatarURL = await this.storageProvider.uploadImage(
      avatarFile,
      'avatar',
    )

    const filters = {
      _id: userId,
    }

    const updateFields = {
      $set: {
        avatar: avatarFile,
        avatarURL,
      },
    }

    await this.usersRepository.update(filters, updateFields)
  }
}
