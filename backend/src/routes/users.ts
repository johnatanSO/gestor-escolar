import { UserController } from './../controllers/UserController'
import express from 'express'

const usersRoutes = express.Router()
const userController = new UserController()

// Routes
usersRoutes.post('/', userController.createNewUser)

export { usersRoutes }
