import express, { Request, Response } from 'express'
import { CreateNewUserService } from '../services/CreateNewUserService.service'
import { UsersRepository } from '../repositories/Users/UsersRepository'
import { AuthenticateUserService } from '../services/AuthenticateUserService.service'
import { StudentsRepository } from '../repositories/Students/StudentsRepository'
const usersRoutes = express.Router()

const usersRepository = new UsersRepository()
const studentsRepository = new StudentsRepository()

// TO-DO: Implementar token JWT.
usersRoutes.get('/verify_token/:token', async (req: Request, res: Response) => {
  try {
    const { token } = req.params
    const user = await usersRepository.checkToken(token)
    const isAuthenticated = !!user
    console.log('token', token)

    if (!isAuthenticated) {
      console.log('Não autenticado')
      return res.status(200).json({
        token: null,
        message: 'Usuário não autenticado',
      })
    }

    res.status(200).json({
      token,
      message: 'Usuário autenticado',
    })
  } catch (err) {
    res.status(400).json({
      error: err,
      message: 'Erro ao verificar o token de usuário',
      token: null,
    })
  }
})

// TO-DO: Implementar token JWT.
usersRoutes.post('/register', async (req: Request, res: Response) => {
  const { name, email, password, occupation } = req.body
  try {
    const createNewUserService = new CreateNewUserService(
      usersRepository,
      studentsRepository,
    )
    const newProduct = await createNewUserService.execute({
      name,
      email,
      password,
      occupation,
    })

    res.status(201).json({
      item: newProduct,
      message: 'Usuário cadastrado com sucesso!',
    })
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    })
  }
})

// TO-DO: Implementar token JWT.
usersRoutes.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const authenticateUserService = new AuthenticateUserService(usersRepository)
    const user = await authenticateUserService.execute({
      email,
      password,
    })

    res.status(200).json({
      item: user,
      message: 'Usuário encontrado com sucesso',
    })
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    })
  }
})

export { usersRoutes }
