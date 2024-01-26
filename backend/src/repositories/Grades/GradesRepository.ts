import { Model } from 'mongoose'
import { Grade, GradeModel } from '../../entities/grade'
import {
  ICreateGradeDTO,
  IGradesRepository,
  IUpdate,
} from './IGradesRepository'

export class GradesRepository implements IGradesRepository {
  model: Model<Grade>
  constructor() {
    this.model = GradeModel
  }

  async create({
    idStudent,
    idSubject,
    firstGrade,
    secondGrade,
  }: ICreateGradeDTO): Promise<Grade> {
    const newGrade = await this.model.create({
      student: idStudent,
      subject: idSubject,
      firstGrade,
      secondGrade,
    })

    await newGrade.save()

    return newGrade
  }

  async update({ idGrade, fields }: IUpdate): Promise<void> {
    await this.model.updateOne({ _id: idGrade }, { $set: fields })
  }

  async listBySubject(idSubject: string): Promise<Grade[]> {
    return await this.model
      .find({ subject: idSubject })
      .populate('student subject')
  }

  async delete(idGrade: string): Promise<void> {
    await this.model.deleteOne({ _id: idGrade })
  }

  async listBySubjectAndStudent(
    idStudent: string,
    idSubject: string,
  ): Promise<Grade> {
    const grade = await this.model.findOne({
      student: idStudent,
      subject: idSubject,
    })

    return grade
  }
}
