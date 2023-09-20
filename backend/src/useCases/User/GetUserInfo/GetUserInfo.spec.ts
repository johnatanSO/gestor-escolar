import { Types } from 'mongoose'
import { AppError } from '../../../errors/AppError'
import { MockUsersRepository } from './../../../repositories/Users/MockUsersRepository'
import { GetUserInfoService } from './GetUserInfoService.service'

let mockUsersRepository: MockUsersRepository

let getUserInfoService: GetUserInfoService

describe('Get user info', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository()

    getUserInfoService = new GetUserInfoService(mockUsersRepository)
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
})