import { inject, injectable } from 'tsyringe'
import { ISubjectsRepository } from '../../repositories/Subjects/ISubjectsRepository'
import { IStudentsRepository } from '../../repositories/Students/IStudentsRepository'

@injectable()
export class ListAllStudentsGradesService {
  subjectsRepository: ISubjectsRepository
  studentsRepository: IStudentsRepository
  constructor(
    @inject('SubjectsRepository') subjectsRepository: ISubjectsRepository,
    @inject('StudentsRepository') studentsRepository: IStudentsRepository,
  ) {
    this.subjectsRepository = subjectsRepository
    this.studentsRepository = studentsRepository
  }

  async execute(idSubject: string) {
    const subject = await this.subjectsRepository.findById(idSubject)
    const queryList = {
      _id: { $in: subject?.students },
    }

    const students = await this.studentsRepository.list(queryList)
    const studentsGradesFormated = students.map((student: any) => {
      const grades = student?.grades?.find(
        (grade: any) => grade?._id === idSubject,
      )
      return {
        ...student._doc,
        grades,
      }
    })

    return studentsGradesFormated
  }
}
