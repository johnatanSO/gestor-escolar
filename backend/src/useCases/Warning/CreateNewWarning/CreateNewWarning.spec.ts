import { MockUsersRepository } from './../../../repositories/Users/MockUsersRepository'
import { MockStudentsRepository } from '../../../repositories/Students/MockStudentsRepository'
import { MockWarningsRepository } from '../../../repositories/Warnings/MockWarningsRepository'
import { CreateNewStudentService } from '../../Student/CreateNewStudent/CreateNewStudentService.service'
import { CreateNewWarningService } from './CreateNewWarningService.service'
import { Types } from 'mongoose'
import { AppError } from '../../../shared/errors/AppError'

let mockWarningsRepository: MockWarningsRepository
let mockStudentsRepository: MockStudentsRepository
let mockUsersRepository: MockUsersRepository

let createNewWarningService: CreateNewWarningService
let createNewStudentService: CreateNewStudentService

describe('Create new warning', () => {
  beforeEach(() => {
    mockWarningsRepository = new MockWarningsRepository()
    mockUsersRepository = new MockUsersRepository()
    mockStudentsRepository = new MockStudentsRepository(mockUsersRepository)
    mockUsersRepository = new MockUsersRepository()

    createNewWarningService = new CreateNewWarningService(
      mockWarningsRepository,
    )
    createNewStudentService = new CreateNewStudentService(
      mockStudentsRepository,
    )
  })

  it('should be able create new warning', async () => {
    const newStudent = await createNewStudentService.execute({
      _id: new Types.ObjectId(),
      idTeacher: new Types.ObjectId().toString(),
    })

    const entriesWarnings = await mockWarningsRepository.getEntries(
      newStudent._id.toString(),
    )

    const newWarning = await createNewWarningService.execute({
      code: (entriesWarnings + 1).toString(),
      title: 'new title warning',
      description: 'New description',
      idStudent: newStudent._id.toString(),
    })

    const createdWarning = await mockWarningsRepository.findById(
      newWarning._id.toString(),
    )

    expect(createdWarning).toBeDefined()
  })

  it('should not be able create new warnings if title not sent', async () => {
    await expect(async () => {
      await createNewWarningService.execute({
        title: undefined,
        description: 'New description warning',
        idStudent: new Types.ObjectId().toString(),
        code: '1',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able create new warnings if idStudent not sent', async () => {
    await expect(async () => {
      await createNewWarningService.execute({
        title: 'New title warning',
        description: 'New description warning',
        idStudent: undefined,
        code: '1',
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
