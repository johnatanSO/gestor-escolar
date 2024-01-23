import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateNewUserService } from '../useCases/User/CreateNewUser/CreateNewUserService.service'
import { GetUserInfoService } from '../useCases/User/GetUserInfo/GetUserInfoService.service'
import { UpdateUserAvatarService } from '../useCases/User/UpdateUserAvatar/UpdateUserAvatarService.service'
import { AppError } from '../shared/errors/AppError'
import { UpdateUserInfosService } from '../useCases/User/UpdateUserInfos/UpdateUserInfosService.service'

export class UserController {
  async createNewUser(req: Request, res: Response): Promise<Response> {
    const { _id: idTeacher } = req.user
    const { name, email, password, occupation } = req.body

    const createNewUserService = container.resolve(CreateNewUserService)
    const newUser = await createNewUserService.execute({
      name,
      email,
      password,
      occupation,
      idTeacher,
    })

    return res.status(201).json({
      success: true,
      title: 'Usuário cadastrado com sucesso',
      item: newUser,
    })
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

    const getUserInfoService = container.resolve(GetUserInfoService)
    const userInfo = await getUserInfoService.execute(userId)

    return res.status(200).json({
      success: true,
      message: 'Busca de informações do usuário concluída com sucesso',
      item: userInfo,
    })
  }

  async updateUserInfos(req: Request, res: Response): Promise<Response> {
    const { idUser, name, email, password } = req.body

    const updateUserInfosService = container.resolve(UpdateUserInfosService)
    await updateUserInfosService.execute({
      name,
      email,
      password,
      idUser,
    })

    return res.status(200).json({
      success: true,
      message: 'Dados do usuário atualizados com sucesso',
    })
  }
}
