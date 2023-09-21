import { Types } from 'mongoose'
import { Warning } from '../../entities/warning'
import { INewWarningDTO, IWarningsRepository } from './IWarningsRepository'

export class MockWarningsRepository implements IWarningsRepository {
  warnings: Warning[] = []

  async list(idStudent: string): Promise<Warning[]> {
    const warnings = this.warnings.filter(
      (warning) => warning.idStudent.toString() === idStudent,
    )

    return warnings
  }

  async create({
    code,
    title,
    description,
    idStudent,
  }: INewWarningDTO): Promise<Warning> {
    const newWarning = {
      code,
      title,
      description,
      idStudent: new Types.ObjectId(idStudent),
      _id: new Types.ObjectId(),
      date: new Date(),
    }

    this.warnings.push(newWarning)

    return newWarning
  }

  async findById(idWarning: string | Types.ObjectId): Promise<Warning> {
    return this.warnings.find((warning) => warning._id.toString() === idWarning)
  }

  async getEntries(idStudent: string): Promise<number> {
    const warnings = this.warnings.filter(
      (warning) => warning.idStudent.toString() === idStudent,
    )

    return warnings.length
  }
}
