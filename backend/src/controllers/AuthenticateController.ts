import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { AuthenticateUserService } from '../useCases/Authenticate/AuthenticateUser/AuthenticateUserService.service'

export class AuthenticateUserController {
  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body

      const authenticateUserService = container.resolve(AuthenticateUserService)
      const authenticateInfos = await authenticateUserService.execute({
        email,
        password,
      })

      return res.status(200).json({
        success: true,
        title: 'Usuário autenticado com sucesso',
        item: authenticateInfos.user,
        token: authenticateInfos.token,
      })
    } catch (err) {
      return res.status(400).json({
        success: false,
        title: 'Erro ao tentar autenticar usuário',
        message: err.message,
        token: null,
      })
    }
  }
}
