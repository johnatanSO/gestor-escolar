import { Request, Response } from 'express'
import { UsersRepository } from '../repositories/Users/UsersRepository'
import { container } from 'tsyringe'
import { CreateNewUserService } from '../useCases/User/CreateNewUserService.service'
import { AuthenticateUserService } from '../useCases/User/AuthenticateUserService.service'

const usersRepository = new UsersRepository()

export class UserController {
  async verifyToken(req: Request, res: Response): Promise<Response> {
    try {
      const { token } = req.params
      const user = await usersRepository.checkToken(token)
      const isAuthenticated = !!user
      console.log('token', token)

      if (!isAuthenticated) {
        return res.status(400).json({
          token: null,
          message: 'Usuário não autenticado',
        })
      }

      return res.status(200).json({
        token,
        message: 'Usuário autenticado',
      })
    } catch (err) {
      return res.status(400).json({
        error: err,
        message: 'Erro ao verificar o token de usuário',
        token: null,
      })
    }
  }

  async createNewUser(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password, occupation } = req.body

      const createNewUserService = container.resolve(CreateNewUserService)
      const newUser = await createNewUserService.execute({
        name,
        email,
        password,
        occupation,
      })

      const authenticateUserService = container.resolve(AuthenticateUserService)
      const token = await authenticateUserService.getToken(newUser)

      return res.status(201).json({
        item: newUser,
        token,
        message: 'Usuário cadastrado com sucesso!',
      })
    } catch (error: any) {
      return res.status(400).json({
        token: null,
        message: error.message,
      })
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body

      const authenticateUserService = container.resolve(AuthenticateUserService)
      const user = await authenticateUserService.execute({
        email,
        password,
      })

      const token = await authenticateUserService.getToken(user)

      return res.status(200).json({
        item: user,
        token,
        message: 'Usuário encontrado com sucesso',
      })
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
        token: null,
      })
    }
  }
}
