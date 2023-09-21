import { Types } from 'mongoose'
import { AppError } from '../../../errors/AppError'
import { CreateNewUserService } from '../CreateNewUser/CreateNewUserService.service'
import { MockUsersRepository } from './../../../repositories/Users/MockUsersRepository'
import { UpdateUserAvatarService } from './UpdateUserAvatarService.service'

let mockUsersRepository: MockUsersRepository

let updateUserAvatarService: UpdateUserAvatarService
let createNewUserService: CreateNewUserService

describe('Update user avatar', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository()

    updateUserAvatarService = new UpdateUserAvatarService(mockUsersRepository)
    createNewUserService = new CreateNewUserService(mockUsersRepository)
  })

  it('should be able update user avatar', async () => {
    const newUser = await createNewUserService.execute({
      name: 'New user test',
      email: 'teste@teste.com',
      password: '123456',
      occupation: 'student',
    })

    const avatarFile = 'nome_do_avatar'

    await updateUserAvatarService.execute({
      userId: newUser._id.toString(),
      avatarFile,
    })

    const updatedAvatar = await mockUsersRepository.findById(
      newUser._id.toString(),
    )

    expect(updatedAvatar.avatar).toEqual(`users/avatar/${avatarFile}`)
  })

  it('should not be able update user avatar if idUser not sent', async () => {
    await expect(async () => {
      const avatarFile = 'nome_do_avatar'

      await updateUserAvatarService.execute({
        userId: undefined,
        avatarFile,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able update user avatar if idUser is from invalid user', async () => {
    await expect(async () => {
      const avatarFile = 'nome_do_avatar'

      await updateUserAvatarService.execute({
        userId: new Types.ObjectId().toString(),
        avatarFile,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able update user avatar if avatarFile not sent', async () => {
    await expect(async () => {
      await updateUserAvatarService.execute({
        userId: new Types.ObjectId().toString(),
        avatarFile: undefined,
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
