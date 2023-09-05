import express from 'express'

import { UsersRepository } from '../repositories/Users/UsersRepository'
import { StudentsRepository } from '../repositories/Students/StudentsRepository'
import { CreateNewUserService } from '../useCases/User/CreateNewUserService.service'
import { AuthenticateUserService } from '../useCases/User/AuthenticateUserService.service'

const usersRoutes = express.Router()

const usersRepository = new UsersRepository()
const studentsRepository = new StudentsRepository()

// TO-DO: Implementar token JWT.
usersRoutes.get('/verify_token/:token', async (req, res) => {
  try {
    const { token } = req.params
    const user = await usersRepository.checkToken(token)
    const isAuthenticated = !!user
    console.log('token', token)

    if (!isAuthenticated) {
      console.log('Não autenticado')
      return res.status(400).json({
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
usersRoutes.post('/register', async (req, res) => {
  const { name, email, password, occupation } = req.body
  try {
    const createNewUserService = new CreateNewUserService(
      usersRepository,
      studentsRepository,
    )
    const newUser = await createNewUserService.execute({
      name,
      email,
      password,
      occupation,
    })

    const authenticateUserService = new AuthenticateUserService(usersRepository)
    const token = await authenticateUserService.getToken(newUser)

    res.status(201).json({
      item: newUser,
      token,
      message: 'Usuário cadastrado com sucesso!',
    })
  } catch (error: any) {
    res.status(400).json({
      token: null,
      message: error.message,
    })
  }
})

// TO-DO: Implementar token JWT.
usersRoutes.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const authenticateUserService = new AuthenticateUserService(usersRepository)
    const user = await authenticateUserService.execute({
      email,
      password,
    })

    const token = await authenticateUserService.getToken(user)

    res.status(200).json({
      item: user,
      token,
      message: 'Usuário encontrado com sucesso',
    })
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
      token: null,
    })
  }
})

export { usersRoutes }
