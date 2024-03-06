import { inject, injectable } from 'tsyringe'
import { ISubjectsRepository } from './../../../repositories/Subjects/ISubjectsRepository'
import { IUsersRepository } from '../../../repositories/Users/IUsersRepository'

@injectable()
export class DeleteStudentService {
  usersRepository: IUsersRepository
  subjectsRepository: ISubjectsRepository

  constructor(
    @inject('UsersRepository') usersRepository: IUsersRepository,
    @inject('SubjectsRepository') subjectsRepository: ISubjectsRepository,
  ) {
    this.usersRepository = usersRepository
    this.subjectsRepository = subjectsRepository
  }

  async execute(idStudent: string): Promise<void> {
    await this.usersRepository.delete(idStudent)
    await this.subjectsRepository.removeStudentFromAllSubjects(idStudent)
  }
}
