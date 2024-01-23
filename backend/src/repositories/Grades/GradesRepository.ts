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
}
