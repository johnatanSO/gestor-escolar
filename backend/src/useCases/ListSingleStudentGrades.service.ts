import { StudentsRepository } from '../repositories/Students/StudentsRepository'
import { SubjectsRepository } from '../repositories/Subjects/SubjectsRepository'

export class ListSingleStudentGrades {
  subjectsRepository: SubjectsRepository
  studentsRepository: StudentsRepository
  constructor(
    subjectsRepository: SubjectsRepository,
    studentsRepository: StudentsRepository,
  ) {
    this.subjectsRepository = subjectsRepository
    this.studentsRepository = studentsRepository
  }

  async execute(idStudent: string): Promise<any[]> {
    const student = await this.studentsRepository.findById(idStudent)

    const queryListSubjects = {
      students: { $elemMatch: { $eq: idStudent } },
    }

    const subjects = await this.subjectsRepository.list(queryListSubjects)
    const studentGrades = subjects.map((subject) => {
      const subjectGrades = student.grades.find(
        (grade) => grade._id === subject._id.toString(),
      )
      return {
        subjectGrades,
        subjectName: subject.name,
        subjectCode: subject.code,
      }
    })

    return studentGrades
  }
}
