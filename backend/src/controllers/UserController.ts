import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateNewUserService } from '../useCases/User/CreateNewUserService.service'
import { GetUserInfoService } from '../useCases/User/GetUserInfoService.service'
import { UpdateUserAvatarService } from '../useCases/User/UpdateUserAvatarService.service'
import { AppError } from '../errors/AppError'
import { CreateNewStudentService } from '../useCases/Student/CreateNewStudent/CreateNewStudentService.service'

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

      if (newUser.occupation === 'student') {
        const createNewStudentService = container.resolve(
          CreateNewStudentService,
        )
        await createNewStudentService.execute(newUser)
      }

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
    const avatarFile = req.file?.filename
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
