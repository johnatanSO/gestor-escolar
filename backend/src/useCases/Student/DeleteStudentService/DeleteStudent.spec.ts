import { MockUsersRepository } from './../../../repositories/Users/MockUsersRepository'
import { MockStudentsRepository } from './../../../repositories/Students/MockStudentsRepository'
import { DeleteStudentService } from './DeleteStudentService.service'
import { CreateNewStudentService } from '../CreateNewStudent/CreateNewStudentService.service'
import { Types } from 'mongoose'
import { AppError } from '../../../errors/AppError'

let mockUsersRepository: MockUsersRepository
let mockStudentsRepository: MockStudentsRepository
let deleteStudentService: DeleteStudentService
let createNewStudentService: CreateNewStudentService

describe('Delete a student', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository()
    mockStudentsRepository = new MockStudentsRepository(mockUsersRepository)

    deleteStudentService = new DeleteStudentService(mockStudentsRepository)
    createNewStudentService = new CreateNewStudentService(
      mockStudentsRepository,
    )
  })

  it('should be able delete a student', async () => {
    const newStudent = await createNewStudentService.execute({
      _id: new Types.ObjectId(),
      idTeacher: new Types.ObjectId().toString(),
    })

    await deleteStudentService.execute(newStudent._id.toString())

    const studentNotFound = await mockStudentsRepository.findById(
      newStudent._id.toString(),
    )

    expect(studentNotFound).toBeUndefined()
  })

  it('should not be able delete a student without _id', () => {
    expect(async () => {
      await deleteStudentService.execute('')
    }).rejects.toBeInstanceOf(AppError)
  })
})
