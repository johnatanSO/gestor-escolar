import { MockStudentsRepository } from './../../../repositories/Students/MockStudentsRepository'
import { MockUsersRepository } from '../../../repositories/Users/MockUsersRepository'
import { CreateNewStudentService } from '../CreateNewStudent/CreateNewStudentService.service'
import { UpdateStudentService } from './UpdateStudentService.service'
import { Types } from 'mongoose'
import { CreateNewUserService } from '../../User/CreateNewUser/CreateNewUserService.service'

let mockUsersRepository: MockUsersRepository
let mockStudentsRepository: MockStudentsRepository

let updateStudentService: UpdateStudentService
let createNewStudentService: CreateNewStudentService
let createNewUserService: CreateNewUserService

describe('Update student', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository()
    mockStudentsRepository = new MockStudentsRepository(mockUsersRepository)

    createNewStudentService = new CreateNewStudentService(
      mockStudentsRepository,
    )
    updateStudentService = new UpdateStudentService(mockUsersRepository)
    createNewUserService = new CreateNewUserService(mockUsersRepository)
  })
  it('should be able update student infos', async () => {
    const user = await createNewUserService.execute({
      name: 'Test student',
      email: 'test@test.com',
      password: '123456',
      occupation: 'student',
    })

    const student = await createNewStudentService.execute({
      _id: user._id,
      idTeacher: new Types.ObjectId().toString(),
    })

    const newDataStudent = {
      name: 'Novo nome',
      email: 'novoemail@gmail.com',
      password: '000000',
    }

    await updateStudentService.execute({
      _id: student._id.toString(),
      name: newDataStudent.name,
      email: newDataStudent.email,
      password: newDataStudent.password,
    })

    const updatedStudent = await mockStudentsRepository.findById(
      student._id.toString(),
    )

    expect(updatedStudent.user).toEqual(expect.objectContaining(newDataStudent))
  })
})
