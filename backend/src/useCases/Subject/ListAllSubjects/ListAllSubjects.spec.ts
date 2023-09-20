import { Types } from 'mongoose'
import { MockSubjectsRepository } from './../../../repositories/Subjects/MockSubjectsRepository'
import { CreateNewSubjectService } from './../CreateNewSubject/CreateNewSubjectService.service'
import { ListAllSubjectsService } from './ListAllSubjectsService.service'
import { AppError } from '../../../errors/AppError'

let mockSubjectsRepository: MockSubjectsRepository

let createNewSubjectService: CreateNewSubjectService
let listAllSubjectsService: ListAllSubjectsService

describe('List all subjects', () => {
  beforeEach(() => {
    mockSubjectsRepository = new MockSubjectsRepository()

    createNewSubjectService = new CreateNewSubjectService(
      mockSubjectsRepository,
    )
    listAllSubjectsService = new ListAllSubjectsService(mockSubjectsRepository)
  })

  it('should be able list all subjects', async () => {
    const idTeacher = new Types.ObjectId().toString()

    const subject = await createNewSubjectService.execute({
      name: 'Teste subject',
      idTeacher,
    })

    const subjects = await listAllSubjectsService.execute({
      idTeacher,
    })

    expect(subjects).toContainEqual(
      expect.objectContaining({ _id: subject._id }),
    )
  })

  it('should not be able list subjects if idTeacher not sent', () => {
    expect(async () => {
      const idTeacher = new Types.ObjectId().toString()

      await createNewSubjectService.execute({
        name: 'Teste subject',
        idTeacher,
      })

      await listAllSubjectsService.execute({ idTeacher: undefined })
    }).rejects.toBeInstanceOf(AppError)
  })
})
