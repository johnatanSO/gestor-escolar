import { Router } from 'express'
import { AuthenticateUserController } from '../../../../controllers/AuthenticateController'

const authenticateRoutes = Router()
const authenticateUserController = new AuthenticateUserController()

authenticateRoutes.post('/login', authenticateUserController.login)

export { authenticateRoutes }
