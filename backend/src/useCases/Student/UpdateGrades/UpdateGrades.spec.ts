import { Types } from 'mongoose'
import { MockStudentsRepository } from '../../../repositories/Students/MockStudentsRepository'
import { MockUsersRepository } from '../../../repositories/Users/MockUsersRepository'
import { UpdateGradesService } from './UpdateGradesService.service'
import { CreateNewUserService } from '../../User/CreateNewUser/CreateNewUserService.service'
import { CreateNewStudentService } from '../CreateNewStudent/CreateNewStudentService.service'
import { AppError } from '../../../errors/AppError'

let mockUsersRepository: MockUsersRepository
let mockStudentsRepository: MockStudentsRepository

let createNewStudentService: CreateNewStudentService
let createNewUserService: CreateNewUserService
let updateGradesService: UpdateGradesService

describe('Update student grades', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository()
    mockStudentsRepository = new MockStudentsRepository(mockUsersRepository)

    createNewStudentService = new CreateNewStudentService(
      mockStudentsRepository,
    )
    createNewUserService = new CreateNewUserService(mockUsersRepository)
    updateGradesService = new UpdateGradesService(mockStudentsRepository)
  })

  it('should be able update grades', async () => {
    const newUser = await createNewUserService.execute({
      name: 'Teste user',
      email: 'teste@teste.com',
      password: 'teste',
      occupation: 'student',
    })

    const newStudent = await createNewStudentService.execute({
      _id: newUser._id,
      idTeacher: new Types.ObjectId().toString(),
    })

    const grades = {
      firstGrade: 1,
      secondGrade: 1,
    }

    await updateGradesService.execute({
      studentsIds: [newStudent._id.toString()],
      subjectId: new Types.ObjectId().toString(),
      grades,
    })

    const student = await mockStudentsRepository.findById(
      newStudent._id.toString(),
    )

    expect(student.grades).toEqual(
      expect.arrayContaining([expect.objectContaining(grades)]),
    )
  })

  it('should not be able update grades if none idSubject is sent', async () => {
    await expect(async () => {
      const grades = {
        firstGrade: 1,
        secondGrade: 1,
      }

      await updateGradesService.execute({
        studentsIds: [new Types.ObjectId().toString()],
        subjectId: undefined,
        grades,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able update grades if none idStudent is sent', async () => {
    await expect(async () => {
      const grades = {
        firstGrade: 1,
        secondGrade: 1,
      }

      await updateGradesService.execute({
        studentsIds: [],
        subjectId: new Types.ObjectId().toString(),
        grades,
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
