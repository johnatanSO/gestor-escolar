import express from 'express'
import multer from 'multer'

import { UserController } from './../controllers/UserController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import uploadConfigs from '../config/upload'

const uploadAvatar = multer(uploadConfigs)
const usersRoutes = express.Router()

const userController = new UserController()

usersRoutes.post('/', userController.createNewUser)

usersRoutes.get('/:userId', userController.getUserInfo)

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  userController.updateUserAvatar,
)

export { usersRoutes }
