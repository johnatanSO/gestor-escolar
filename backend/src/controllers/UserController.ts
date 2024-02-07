import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateNewUserService } from '../useCases/User/CreateNewUser/CreateNewUserService.service'
import { GetUserInfoService } from '../useCases/User/GetUserInfo/GetUserInfoService.service'
import { UpdateUserAvatarService } from '../useCases/User/UpdateUserAvatar/UpdateUserAvatarService.service'
import { AppError } from '../errors/AppError'

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

  async updateUserAvatar(req: Request, res: Response): Promise<Response> {
    const avatarFile = req.file.filename

    if (!avatarFile) throw new AppError('Imagem não enviada')

    const updateUserAvatarService = container.resolve(UpdateUserAvatarService)
    await updateUserAvatarService.execute({ userId: req.user._id, avatarFile })

    return res.status(200).json({
      success: true,
      message: 'Avatar atualizado com sucesso',
    })
  }

  async getUserInfo(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params
    const [, token] = req.headers.authorization.split(' ')

    const getUserInfoService = container.resolve(GetUserInfoService)
    const userInfo = await getUserInfoService.execute(userId)

    return res.status(200).json({
      success: true,
      message: 'Busca de informaões do usuário concluída com sucesso',
      item: userInfo,
      token,
    })
  }
}
