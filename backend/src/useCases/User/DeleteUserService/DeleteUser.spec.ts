import { Types } from 'mongoose'
import { AppError } from '../../../errors/AppError'
import { MockUsersRepository } from '../../../repositories/Users/MockUsersRepository'
import { CreateNewUserService } from '../CreateNewUser/CreateNewUserService.service'
import { DeleteUserService } from './DeleteUserService.service'

let mockUsersRepository: MockUsersRepository

let createNewUserService: CreateNewUserService
let deleteUserService: DeleteUserService

describe('Delete a user', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository()

    createNewUserService = new CreateNewUserService(mockUsersRepository)
    deleteUserService = new DeleteUserService(mockUsersRepository)
  })

  it('should be able delete a user', async () => {
    const newUser = await createNewUserService.execute({
      name: 'Name new user',
      email: 'emailtest@gmail.com',
      password: '123456',
      occupation: 'student',
    })

    await deleteUserService.execute(newUser._id.toString())

    const notFoundUser = await mockUsersRepository.findById(
      newUser._id.toString(),
    )

    expect(notFoundUser).toBeUndefined()
  })

  it('should not be able delete a user if idUser not sent', async () => {
    await expect(async () => {
      await deleteUserService.execute(undefined)
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able delete a user if idUser is from invalid user', async () => {
    await expect(async () => {
      // _id aleatório, não pertence a nenhum usuário cadastrado, portanto é invalido.
      const fakeIdUser = new Types.ObjectId()

      await deleteUserService.execute(fakeIdUser.toString())
    }).rejects.toBeInstanceOf(AppError)
  })
})
