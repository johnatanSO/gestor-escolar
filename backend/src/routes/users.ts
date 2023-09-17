import { UserController } from './../controllers/UserController'
import express from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import multer from 'multer'
import uploadConfigs from '../config/upload'

const uploadAvatar = multer(uploadConfigs.upload('./tmp/avatar'))
const usersRoutes = express.Router()
const userController = new UserController()

// Routes
usersRoutes.post('/', userController.createNewUser)
usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  userController.updateUserAvatar,
)

export { usersRoutes }
