import { Types } from 'mongoose'
import { AppError } from '../../../shared/errors/AppError'
import { MockUsersRepository } from './../../../repositories/Users/MockUsersRepository'
import { GetUserInfoService } from './GetUserInfoService.service'
import { CreateNewUserService } from '../CreateNewUser/CreateNewUserService.service'

let mockUsersRepository: MockUsersRepository

let getUserInfoService: GetUserInfoService
let createNewUserService: CreateNewUserService

describe('Get user info', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository()

    getUserInfoService = new GetUserInfoService(mockUsersRepository)
    createNewUserService = new CreateNewUserService(mockUsersRepository)
  })

  it('should not be able search user info if idUser not sent', async () => {
    await expect(async () => {
      await getUserInfoService.execute(undefined)
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able search user info if idUser is from invalid user', async () => {
    await expect(async () => {
      const idUser = new Types.ObjectId()

      await getUserInfoService.execute(idUser.toString())
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should be able search user info', async () => {
    const newUser = await createNewUserService.execute({
      name: 'Teste',
      email: 'teste@teste.com',
      password: '123456',
      occupation: 'student',
    })

    const createdUser = await mockUsersRepository.findById(
      newUser._id.toString(),
    )

    expect(createdUser).toBeDefined()
  })
})
