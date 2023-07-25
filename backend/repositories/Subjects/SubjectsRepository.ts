import { SubjectModel } from '../../models/subject'
import {
  ISubjectsRepository,
  InsertStudentParams,
  NewSubject,
} from './ISubjectsRepository'

export class SubjectsRepository implements ISubjectsRepository {
  async list(): Promise<any[]> {
    const subjects = await SubjectModel.find()
    return subjects
  }

  async create({ name }: NewSubject): Promise<any> {
    const newSubject = new SubjectModel({ name })
    await newSubject.save()

    return newSubject
  }

  async insertStudent({ studentsIds, subjectId }: InsertStudentParams) {
    SubjectModel.updateOne(
      { _id: subjectId },
      { $push: { students: studentsIds } },
    )
  }
}
