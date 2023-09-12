import { UserController } from './../controllers/UserController'
import express from 'express'

const usersRoutes = express.Router()
const userController = new UserController()

usersRoutes.get('/verify_token/:token', userController.verifyToken)

usersRoutes.post('/register', userController.createNewUser)

usersRoutes.post('/login', userController.login)

export { usersRoutes }
