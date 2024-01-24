import { Model } from 'mongoose'
import { ISubject, SubjectModel } from '../../entities/subject'
import {
  ISubjectsRepository,
  INewSubjectDTO,
  IUpdate,
} from './ISubjectsRepository'

export class SubjectsRepository implements ISubjectsRepository {
  model: Model<ISubject>
  constructor() {
    this.model = SubjectModel
  }

  async list(idTeacher: string): Promise<ISubject[]> {
    return await this.model.find({ teacher: idTeacher })
  }

  async findById(idSubject: string): Promise<ISubject> {
    return await this.model.findOne({ _id: idSubject }).populate('students')
  }

  async delete(idSubject: string): Promise<void> {
    await this.model.deleteOne({ _id: idSubject })
  }

  async create({ name, code, idTeacher }: INewSubjectDTO): Promise<ISubject> {
    const newSubject = await this.model.create({
      name,
      code,
      teacher: idTeacher,
    })

    await newSubject.save()

    return newSubject
  }

  async update({ fields, idSubject }: IUpdate): Promise<void> {
    await this.model.updateOne({ _id: idSubject }, { $set: fields })
  }

  async getEntries({ idTeacher }): Promise<number> {
    return await this.model.countDocuments({ teacher: idTeacher })
  }
}
