import { Grade } from '../../entities/grade'

export interface IUpdate {
  idGrade: string
  fields: any
}

export interface ICreateGradeDTO {
  idStudent: string
  idSubject: string
  firstGrade: number
  secondGrade: number
}

export interface IGradesRepository {
  create({
    idStudent,
    idSubject,
    firstGrade,
    secondGrade,
  }: ICreateGradeDTO): Promise<Grade>

  update({ idGrade, fields }: IUpdate): Promise<void>

  listBySubject(idSubject: string): Promise<Grade[]>

  listByStudent(idStudent: string): Promise<Grade[]>

  listBySubjectAndStudent(idStudent: string, idSubject: string): Promise<Grade>

  delete(idGrade: string): Promise<void>
}
