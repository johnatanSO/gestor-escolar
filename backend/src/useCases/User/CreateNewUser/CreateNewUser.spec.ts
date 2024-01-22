import { AppError } from '../../../shared/errors/AppError'
import { MockUsersRepository } from '../../../repositories/Users/MockUsersRepository'
import { CreateNewUserService } from './CreateNewUserService.service'

let mockUsersRepository: MockUsersRepository

let createNewUserService: CreateNewUserService

describe('Create a new user', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository()

    createNewUserService = new CreateNewUserService(mockUsersRepository)
  })

  it('should be able create a new user', async () => {
    const newUser = await createNewUserService.execute({
      name: 'New user name',
      email: 'teste@teste.com',
      password: '123456',
      occupation: 'student',
    })

    const verifyUserCreated = await mockUsersRepository.findById(
      newUser._id.toString(),
    )

    expect(verifyUserCreated).toBeDefined()
  })

  it('should not be able create a new user if name not sent', async () => {
    await expect(async () => {
      await createNewUserService.execute({
        name: undefined,
        email: 'testewithoutname@teste.com',
        password: '123456',
        occupation: 'student',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able create a new user if e-mail not sent', async () => {
    await expect(async () => {
      await createNewUserService.execute({
        name: 'teste without e-mail',
        email: undefined,
        password: '123456',
        occupation: 'student',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able create a new user if password not sent', async () => {
    await expect(async () => {
      await createNewUserService.execute({
        name: 'teste without password',
        email: 'testewithoutpassword@teste.com',
        password: undefined,
        occupation: 'student',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able create a new user if occupation not sent', async () => {
    await expect(async () => {
      await createNewUserService.execute({
        name: 'teste without occupation',
        email: 'testewithoutocupation@teste.com',
        password: '123456',
        occupation: undefined,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able create a new user if e-mail already exists', async () => {
    await expect(async () => {
      await createNewUserService.execute({
        name: 'name email exist',
        email: 'testeemailexist@teste.com',
        password: '123456',
        occupation: 'student',
      })

      await createNewUserService.execute({
        name: 'name email exist',
        email: 'testeemailexist@teste.com',
        password: '123456',
        occupation: 'student',
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
