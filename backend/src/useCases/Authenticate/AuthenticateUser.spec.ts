import 'reflect-metadata'
import { INewUserDTO } from './../../repositories/Users/IUsersRepository'
import { CreateNewUserService } from './../User/CreateNewUserService.service'
import { MockUsersRepository } from '../../repositories/Users/MockUsersRepository'
import { AuthenticateUserService } from './AuthenticateUserService.service'

let mockUsersRepository: MockUsersRepository
let authenticateUserService: AuthenticateUserService
let createNewUserService: CreateNewUserService

describe('Authenticate user', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository()
    authenticateUserService = new AuthenticateUserService(mockUsersRepository)
    createNewUserService = new CreateNewUserService(mockUsersRepository)
  })

  it('should be able authenticate a user', async () => {
    const userInfos: INewUserDTO = {
      name: 'Teste',
      email: 'teste@gmail.com',
      password: '123456',
      occupation: 'teacher',
    }

    await createNewUserService.execute(userInfos)

    const authInfos = await authenticateUserService.execute({
      email: userInfos.email,
      password: userInfos.password,
    })

    expect(authInfos).toHaveProperty('token')
  })

  it('should not be able authenticate a none exists user', () => {
    expect(async () => {
      await authenticateUserService.execute({
        email: 'unexist@gmail.com',
        password: 'unexist',
      })
    }).rejects.toThrow()
  })

  it('should not be able authenticate a incorrect password', () => {
    expect(async () => {
      const user = {
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456',
        occupation: 'teacher',
      }

      await createNewUserService.execute(user)

      await authenticateUserService.execute({
        email: user.email,
        password: 'incorrect_password',
      })
    }).rejects.toThrow()
  })
})
