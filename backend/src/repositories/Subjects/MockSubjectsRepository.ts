import { Types } from 'mongoose'
import { ISubject } from '../../entities/subject'
import {
  IInsertStudentDTO,
  INewSubjectDTO,
  ISubjectsRepository,
} from './ISubjectsRepository'

export class MockSubjectsRepository implements ISubjectsRepository {
  subjects: ISubject[] = []

  async list(query: any): Promise<ISubject[]> {
    return this.subjects
  }

  async create(newSubjectData: INewSubjectDTO): Promise<ISubject> {
    const newSubject = {
      ...newSubjectData,
      students: null,
      _id: new Types.ObjectId(),
    }

    this.subjects.push(newSubject)

    return newSubject
  }

  async findById(idSubject: string | Types.ObjectId): Promise<ISubject> {
    return this.subjects.find((subject) => subject._id.toString() === idSubject)
  }

  async delete(idSubject: string): Promise<void> {
    this.subjects = this.subjects.filter(
      (subject) => subject._id.toString() !== idSubject,
    )
  }

  async insertStudent({
    studentsIds,
    subjectId,
  }: IInsertStudentDTO): Promise<void> {
    const indexSubject = this.subjects.findIndex(
      (subject) => subject._id.toString() === subjectId,
    )

    if (indexSubject !== -1) {
      this.subjects[indexSubject].students = studentsIds
    }
  }

  async getEntries(): Promise<number> {
    return this.subjects.length
  }
}
