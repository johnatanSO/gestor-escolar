import { Types } from 'mongoose'
import { MockStudentsRepository } from '../../../repositories/Students/MockStudentsRepository'
import { MockUsersRepository } from '../../../repositories/Users/MockUsersRepository'
import { CreateNewStudentService } from '../CreateNewStudent/CreateNewStudentService.service'
import { UpdateWarningsAmount } from './UpdateWarningsAmount.service'

let mockStudentsRepository: MockStudentsRepository
let mockUsersRepository: MockUsersRepository

let updateWarningsAmount: UpdateWarningsAmount
let createNewStudentService: CreateNewStudentService

describe('Update numbers of student warnings', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository()
    mockStudentsRepository = new MockStudentsRepository(mockUsersRepository)

    updateWarningsAmount = new UpdateWarningsAmount(mockStudentsRepository)
    createNewStudentService = new CreateNewStudentService(
      mockStudentsRepository,
    )
  })

  it('should not be able update numbers of warnings if idStudent no sent', () => {
    expect(async () => {
      await updateWarningsAmount.execute(undefined)
    })
  })

  it('should be able update numbers of student warnings', async () => {
    const student = await createNewStudentService.execute({
      _id: new Types.ObjectId(),
      idTeacher: new Types.ObjectId().toString(),
    })

    await updateWarningsAmount.execute(student._id.toString())

    const updatedStudent = await mockStudentsRepository.findById(
      student._id.toString(),
    )

    expect(updatedStudent.warningsAmount).toBeGreaterThan(
      student.warningsAmount,
    )
  })
})
