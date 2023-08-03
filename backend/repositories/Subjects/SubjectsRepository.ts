import { SubjectModel } from '../../models/subject'
import {
  ISubjectsRepository,
  InsertStudentParams,
  NewSubject,
  Subject,
} from './ISubjectsRepository'

export class SubjectsRepository implements ISubjectsRepository {
  async list(): Promise<Subject[]> {
    return await SubjectModel.find()
  }

  async findById(subjectId: string): Promise<Subject | null> {
    return await SubjectModel.findOne({ _id: subjectId })
  }

  async delete(idSubject: string) {
    await SubjectModel.deleteOne({ _id: idSubject })
  }

  async create(SubjectData: NewSubject): Promise<any> {
    const newSubject = new SubjectModel(SubjectData)
    await newSubject.save()

    return newSubject
  }

  async insertStudent({ studentsIds, subjectId }: InsertStudentParams) {
    await SubjectModel.updateOne(
      { _id: subjectId },
      { $set: { students: studentsIds } },
    )
  }

  async getEntries(): Promise<number> {
    return await SubjectModel.countDocuments()
  }
}
