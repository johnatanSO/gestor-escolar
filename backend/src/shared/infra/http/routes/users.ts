import express from 'express'
import multer from 'multer'

import { UserController } from '../../../../controllers/UserController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const uploadAvatar = multer()
const usersRoutes = express.Router()
const userController = new UserController()

usersRoutes.post('/', userController.createNewUser)

usersRoutes.get('/:userId', ensureAuthenticated, userController.getUserInfo)

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  userController.updateUserAvatar,
)

usersRoutes.put('/', ensureAuthenticated, userController.updateUserInfos)

export { usersRoutes }
