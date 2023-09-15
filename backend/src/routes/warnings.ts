import express from 'express'
import { WarningController } from '../controllers/WarningController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const warningsRoutes = express.Router()
const warningController = new WarningController()

// Middlewares
warningsRoutes.use(ensureAuthenticated)

// Routes
warningsRoutes.post('/', warningController.createNewWarning)

warningsRoutes.get('/:idStudent', warningController.listWarnings)

export { warningsRoutes }
