import { IUsersRepository } from '../../../repositories/Users/IUsersRepository'
import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../shared/errors/AppError'
import { IStorageProvider } from '../../../shared/containers/providers/StorageProvider/IStorageProvider'
import { User } from '../../../entities/user'

interface IRequest {
  userId: string
  avatarFile: {
    filename: string
    originalname: string
    buffer: Buffer
    mimetype: string
  }
}
interface IResponse {

}

@injectable()
export class UpdateUserAvatarService {
  usersRepository: IUsersRepository
  storageProvider: IStorageProvider
  constructor(
    @inject('UsersRepository') usersRepository: IUsersRepository,
    @inject('FirebaseProvider') storageProvider: IStorageProvider,
  ) {
    this.usersRepository = usersRepository
    this.storageProvider = storageProvider
  }

  async execute({ userId, avatarFile }: IRequest): Promise<Omit<User, 'password'>> {
    if (!avatarFile) throw new AppError('Avatar não informado')

    const user = await this.usersRepository.findById(userId)

    if (user.avatar) {
      const [, imageName] = user.avatar.split('appspot.com/')

      if (!imageName) throw new AppError('Nome da imagem inválido')

      await this.storageProvider.deleteImage(imageName)
    }

    const { imageURL } = await this.storageProvider.uploadImage(avatarFile)

    const filters = {
      _id: userId,
    }

    const updateFields = {
      $set: {
        avatar: imageURL,
      },
    }

    await this.usersRepository.update(filters, updateFields)

    const updatedUser = await this.usersRepository.findById(userId)

    return updatedUser
  }
}
