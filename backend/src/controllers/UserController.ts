import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateNewUserService } from '../useCases/User/CreateNewUserService.service'

export class UserController {
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

      delete newUser.password
      delete newUser._id

      return res.status(201).json({
        success: true,
        title: 'Usuário cadastrado com sucesso',
        item: newUser,
      })
    } catch (err) {
      return res.status(400).json({
        success: false,
        title: 'Erro ao tentar cadastrar usuário',
        message: err.message,
      })
    }
  }
}
