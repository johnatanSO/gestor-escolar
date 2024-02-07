import { UserController } from './../controllers/UserController'
import express from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import multer from 'multer'
import uploadConfigs from '../config/upload'
import path from 'path'

const uploadAvatar = multer(uploadConfigs.upload('./tmp/avatar'))
const usersRoutes = express.Router()
const userController = new UserController()

// Routes
usersRoutes.post('/', userController.createNewUser)
usersRoutes.get('/:userId', userController.getUserInfo)
usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  userController.updateUserAvatar,
)
usersRoutes.use(
  '/avatar',
  express.static(path.join(__dirname, '..', '..', 'tmp', 'avatar')),
)

export { usersRoutes }
