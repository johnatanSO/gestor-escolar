import { Model } from 'mongoose'
import { SubjectModel } from '../../entities/subject'
import {
  ISubjectsRepository,
  InsertStudentParams,
  NewSubject,
  Subject,
} from './ISubjectsRepository'

export class SubjectsRepository implements ISubjectsRepository {
  model: Model<any>
  constructor() {
    this.model = SubjectModel
  }

  async list(queryList = {}): Promise<Subject[]> {
    return await this.model.find(queryList)
  }

  async findById(subjectId: string): Promise<Subject | null> {
    return await this.model.findOne({ _id: subjectId })
  }

  async delete(idSubject: string) {
    await this.model.deleteOne({ _id: idSubject })
  }

  async create(SubjectData: NewSubject): Promise<any> {
    const newSubject = await this.model.create(SubjectData)
    await newSubject.save()

    return newSubject
  }

  async insertStudent({ studentsIds, subjectId }: InsertStudentParams) {
    await this.model.updateOne(
      { _id: subjectId },
      { $set: { students: studentsIds } },
    )
  }

  async getEntries(): Promise<number> {
    return await this.model.countDocuments()
  }
}
