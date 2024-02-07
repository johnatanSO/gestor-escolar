import { IUsersRepository } from '../../../repositories/Users/IUsersRepository'
import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../shared/errors/AppError'
import { IStorageProvider } from '../../../shared/containers/providers/StorageProvider/IStorageProvider'
import { User } from '../../../entities/user'

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

  async execute({ userId, avatarFile }: IRequest): Promise<User> {
    if (!avatarFile) throw new AppError('Avatar não informado')

    const user = await this.usersRepository.findById(userId)
    if (!user) throw new AppError('Usuário inválido')

    if (user.avatar) {
      await this.storageProvider.deleteImage(user.avatar, 'avatar')
    }

    const imageURL = await this.storageProvider.uploadImage(
      avatarFile,
      'avatar',
    )

    const filters = {
      _id: userId,
    }

    const updateFields = {
      $set: {
        avatar: avatarFile,
        avatarURL: imageURL,
      },
    }

    await this.usersRepository.update(filters, updateFields)

    const updatedUser = await this.usersRepository.findById(userId)

    return updatedUser
  }
}
