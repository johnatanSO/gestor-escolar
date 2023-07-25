import { StudentModel } from '../../models/student'
import { IStudentsRepository } from './IStudentsRepository'

export class StudentsRepository implements IStudentsRepository {
  async list(): Promise<any[]> {
    const students = await StudentModel.find()
    return students
  }

  async create(name: string) {
    const newStudent = new StudentModel({ name })
    await newStudent.save()
  }
}
