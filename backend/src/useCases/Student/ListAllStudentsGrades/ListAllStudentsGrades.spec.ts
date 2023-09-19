import 'reflect-metadata'
import { InsertStudentInSubjectService } from './../../Subject/InsertStudentInSubjectService.service'
import { Types } from 'mongoose'
import { MockSubjectsRepository } from '../../../repositories/Subjects/MockSubjectsRepository'
import { MockStudentsRepository } from './../../../repositories/Students/MockStudentsRepository'
import { ListAllStudentsGradesService } from './ListAllStudentsGradesService.service'
import { AppError } from '../../../errors/AppError'
import { CreateNewSubjectService } from '../../Subject/CreateNewSubjectService.service'
import { CreateNewStudentService } from '../CreateNewStudent/CreateNewStudentService.service'
import { UpdateGradesService } from '../UpdateGrades/UpdateGradesService.service'

let mockStudentsRepository: MockStudentsRepository
let mockSubjectsRepository: MockSubjectsRepository

let listAllStudentsGradesService: ListAllStudentsGradesService
let createNewSubjectService: CreateNewSubjectService
let insertStudentInSubjectService: InsertStudentInSubjectService
let createNewStudentService: CreateNewStudentService
let updateGradesService: UpdateGradesService

describe('Getting grades by all students', () => {
  beforeEach(() => {
    mockSubjectsRepository = new MockSubjectsRepository()
    createNewSubjectService = new CreateNewSubjectService(
      mockSubjectsRepository,
    )

    mockStudentsRepository = new MockStudentsRepository()
    listAllStudentsGradesService = new ListAllStudentsGradesService(
      mockSubjectsRepository,
      mockStudentsRepository,
    )
    insertStudentInSubjectService = new InsertStudentInSubjectService(
      mockSubjectsRepository,
    )
    createNewStudentService = new CreateNewStudentService(
      mockStudentsRepository,
    )
    updateGradesService = new UpdateGradesService(mockStudentsRepository)
  })

  it('should not be able get grades if subject is not registered', () => {
    expect(async () => {
      const idSubject = new Types.ObjectId().toString()
      await listAllStudentsGradesService.execute(idSubject)
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able get grades if subjectId not informed', () => {
    expect(async () => {
      const idSubject = ''
      await listAllStudentsGradesService.execute(idSubject)
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should be able get grades of all students', async () => {
    // TO-DO: Create a valid User and Student to tests.
    const newSubject = await createNewSubjectService.execute({
      name: 'Teste português',
      idTeacher: new Types.ObjectId().toString(),
    })

    const newStudent1 = await createNewStudentService.execute({
      _id: new Types.ObjectId(),
      idTeacher: new Types.ObjectId().toString(),
    })

    const newStudent2 = await createNewStudentService.execute({
      _id: new Types.ObjectId(),
      idTeacher: new Types.ObjectId().toString(),
    })

    const studentsIds = [newStudent1._id.toString(), newStudent2._id.toString()]

    await insertStudentInSubjectService.execute({
      studentsIds,
      subjectId: newSubject._id.toString(),
    })

    await updateGradesService.execute({
      studentsIds,
      subjectId: newSubject._id.toString(),
      grades: {
        firstGrade: 0,
        secondGrade: 0,
      },
    })

    const studentsGrades = await listAllStudentsGradesService.execute(
      newSubject._id.toString(),
    )

    const expectedStructure = {
      code: expect.any(String),
      name: expect.any(String),
      grades: {
        _id: expect.any(String),
        firstGrade: expect.any(Number),
        secondGrade: expect.any(Number),
        totalGrades: expect.any(Number),
      },
    }

    studentsGrades.forEach((student) => {
      expect(student).toMatchObject(expectedStructure)
    })
  })
})
