import { CreateNewStudentService } from './CreateNewStudentService.service'
import { MockStudentsRepository } from '../../../repositories/Students/MockStudentsRepository'
import { Types } from 'mongoose'
import { MockUsersRepository } from '../../../repositories/Users/MockUsersRepository'
import { AppError } from '../../../errors/AppError'

let mockStudentsRepository: MockStudentsRepository
let createNewStudentService: CreateNewStudentService
let mockUsersRepository: MockUsersRepository

describe('Creating new student', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository()
    mockStudentsRepository = new MockStudentsRepository(mockUsersRepository)
    createNewStudentService = new CreateNewStudentService(
      mockStudentsRepository,
    )
  })

  it('Should be able create a new student', async () => {
    const newStudent = await createNewStudentService.execute({
      _id: new Types.ObjectId(),
      idTeacher: new Types.ObjectId().toString(),
    })

    expect(newStudent).toHaveProperty('_id')
  })

  it('Should not be able create a new student if the _id of the user is not provided', async () => {
    await expect(async () => {
      await createNewStudentService.execute({
        _id: undefined,
        idTeacher: new Types.ObjectId().toString(),
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
