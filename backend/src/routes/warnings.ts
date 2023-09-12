import express from 'express'
import { WarningController } from '../controllers/WarningController'

const warningsRoutes = express.Router()
const warningController = new WarningController()

warningsRoutes.post('/', warningController.createNewWarning)

warningsRoutes.get('/:idStudent', warningController.listWarnings)

export { warningsRoutes }
