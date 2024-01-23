import { ISubject } from '../../entities/subject'

export interface INewSubjectDTO {
  name: string
  code?: string
  idTeacher: string
}

export interface IUpdate {
  fields: any
  idSubject: string
}

export interface FiltersGetEntries {
  idTeacher: string
}

export interface ISubjectsRepository {
  list: (idTeacher: string) => Promise<ISubject[]>
  create: (newSubjectData: INewSubjectDTO) => Promise<ISubject>
  findById: (idSubject: string) => Promise<ISubject>
  delete: (idSubject: string) => Promise<void>
  update: ({ fields, idSubject }: IUpdate) => Promise<void>
  getEntries: ({ idTeacher }: FiltersGetEntries) => Promise<number>
}
