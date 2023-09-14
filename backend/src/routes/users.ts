import { UserController } from './../controllers/UserController'
import express from 'express'

const usersRoutes = express.Router()
const userController = new UserController()

usersRoutes.post('/', userController.createNewUser)

export { usersRoutes }
