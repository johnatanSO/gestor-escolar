import { Model } from 'mongoose'
import { Warning, WarningModel } from '../../entities/warning'
import { IWarningsRepository, INewWarningDTO } from './IWarningsRepository'

export class WarningsRepository implements IWarningsRepository {
  model: Model<Warning>
  constructor() {
    this.model = WarningModel
  }

  async list(idStudent?: string): Promise<Warning[]> {
    const query = {
      ...(idStudent ? { student: idStudent } : {}),
    }
    return await this.model.find(query).sort({ date: 1 })
  }

  async findById(warningId: string): Promise<Warning | null> {
    return await this.model.findOne({ _id: warningId })
  }

  async create({
    code,
    title,
    description,
    idStudent,
  }: INewWarningDTO): Promise<Warning> {
    const newWarning = await this.model.create({
      code,
      title,
      description,
      student: idStudent,
    })

    await newWarning.save()

    return newWarning
  }

  async getEntries(idStudent: string): Promise<number> {
    return await this.model.countDocuments({ idStudent })
  }
}
