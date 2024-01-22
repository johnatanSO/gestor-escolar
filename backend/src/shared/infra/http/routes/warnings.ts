import express from 'express'
import { WarningController } from '../../../../controllers/WarningController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const warningsRoutes = express.Router()
const warningController = new WarningController()

warningsRoutes.use(ensureAuthenticated)

// warningsRoutes.post('/', warningController.createNewWarning)

warningsRoutes.get('/:idStudent', warningController.listWarnings)

export { warningsRoutes }
