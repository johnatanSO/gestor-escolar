import { MockStudentsRepository } from './../../../repositories/Students/MockStudentsRepository'
import { MockSubjectsRepository } from '../../../repositories/Subjects/MockSubjectsRepository'
import { ListSingleStudentGrades } from './ListSingleStudentGrades.service'
import { MockUsersRepository } from '../../../repositories/Users/MockUsersRepository'
import { AppError } from '../../../errors/AppError'
import { Types } from 'mongoose'
import { CreateNewSubjectService } from '../../Subject/CreateNewSubjectService.service'
import { CreateNewUserService } from '../../User/CreateNewUserService.service'
import { CreateNewStudentService } from '../CreateNewStudent/CreateNewStudentService.service'
import { InsertStudentInSubjectService } from '../../Subject/InsertStudentInSubjectService.service'
import { UpdateGradesService } from '../UpdateGrades/UpdateGradesService.service'

let mockUsersRepository: MockUsersRepository
let mockSubjectsRepository: MockSubjectsRepository
let mockStudentsRepository: MockStudentsRepository

let listSingleStudentGrades: ListSingleStudentGrades
let createNewSubjectService: CreateNewSubjectService
let createNewUserService: CreateNewUserService
let createNewStudentService: CreateNewStudentService
let insertStudentInSubjectService: InsertStudentInSubjectService
let updateGradesService: UpdateGradesService

describe('List single student grades', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository()
    mockStudentsRepository = new MockStudentsRepository(mockUsersRepository)
    mockSubjectsRepository = new MockSubjectsRepository()

    listSingleStudentGrades = new ListSingleStudentGrades(
      mockSubjectsRepository,
      mockStudentsRepository,
    )
    createNewSubjectService = new CreateNewSubjectService(
      mockSubjectsRepository,
    )
    createNewUserService = new CreateNewUserService(mockUsersRepository)
    createNewStudentService = new CreateNewStudentService(
      mockStudentsRepository,
    )
    insertStudentInSubjectService = new InsertStudentInSubjectService(
      mockSubjectsRepository,
    )
    updateGradesService = new UpdateGradesService(mockStudentsRepository)
  })

  it('should not be able get grades if _id not informed', () => {
    expect(async () => {
      await listSingleStudentGrades.execute(undefined)
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able get grades if idStudent is from an invalid student', () => {
    expect(async () => {
      const idStudent = new Types.ObjectId()
      await listSingleStudentGrades.execute(idStudent.toString())
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should be able get grades', async () => {
    const newSubject = await createNewSubjectService.execute({
      name: 'Teste português',
      idTeacher: new Types.ObjectId().toString(),
    })

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

    await insertStudentInSubjectService.execute({
      studentsIds: [newStudent._id.toString()],
      subjectId: newSubject._id.toString(),
    })

    await updateGradesService.execute({
      studentsIds: [newStudent._id.toString()],
      subjectId: newSubject._id.toString(),
      grades: {
        firstGrade: 0,
        secondGrade: 0,
      },
    })

    const studentGrades = await listSingleStudentGrades.execute(
      newStudent._id.toString(),
    )

    const expectedStructure = {
      subjectName: expect.any(String),
      subjectCode: expect.any(String),
      subjectGrades: {
        _id: expect.any(String),
        firstGrade: expect.any(Number),
        secondGrade: expect.any(Number),
        totalGrades: expect.any(Number),
      },
    }

    studentGrades.forEach((grade) => {
      expect(grade).toMatchObject(expectedStructure)
    })
  })
})
