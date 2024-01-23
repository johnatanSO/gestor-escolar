import { Grade } from '../../entities/grade'

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
}
