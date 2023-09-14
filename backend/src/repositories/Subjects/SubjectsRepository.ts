import { Model } from 'mongoose'
import { ISubject, SubjectModel } from '../../entities/subject'
import {
  ISubjectsRepository,
  IInsertStudentDTO,
  INewSubjectDTO,
} from './ISubjectsRepository'

export class SubjectsRepository implements ISubjectsRepository {
  model: Model<ISubject>
  constructor() {
    this.model = SubjectModel
  }

  async list(queryList = {}): Promise<ISubject[]> {
    return await this.model.find(queryList)
  }

  async findById(subjectId: string): Promise<ISubject> {
    return await this.model.findOne({ _id: subjectId })
  }

  async delete(idSubject: string): Promise<void> {
    await this.model.deleteOne({ _id: idSubject })
  }

  async create(SubjectData: INewSubjectDTO): Promise<ISubject> {
    const newSubject = await this.model.create(SubjectData)
    await newSubject.save()

    return newSubject
  }

  async insertStudent({
    studentsIds,
    subjectId,
  }: IInsertStudentDTO): Promise<void> {
    await this.model.updateOne(
      { _id: subjectId },
      { $set: { students: studentsIds } },
    )
  }

  async getEntries(): Promise<number> {
    return await this.model.countDocuments()
  }
}
