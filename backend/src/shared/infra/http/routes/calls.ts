import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { CallController } from '../../../../controllers/CallController'

const callsRoutes = Router()

const callController = new CallController()

callsRoutes.get('/:date', ensureAuthenticated, callController.getCallByDate)

callsRoutes.post('/', ensureAuthenticated, callController.finalizeCall)

export { callsRoutes }
