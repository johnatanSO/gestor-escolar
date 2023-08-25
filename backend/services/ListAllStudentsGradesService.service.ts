import { StudentsRepository } from './../repositories/Students/StudentsRepository'
import { SubjectsRepository } from './../repositories/Subjects/SubjectsRepository'

export class ListAllStudentsGradesService {
  subjectsRepository: SubjectsRepository
  studentsRepository: StudentsRepository
  constructor(
    subjectsRepository: SubjectsRepository,
    studentsRepository: StudentsRepository,
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
