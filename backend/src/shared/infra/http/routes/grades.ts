import { GradeController } from '../../../../controllers/GradeController'
import express from 'express'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const gradesRoutes = express.Router()
const gradeController = new GradeController()

gradesRoutes.get('/:idSubject', ensureAuthenticated, gradeController.list)

gradesRoutes.put('/:idGrade', ensureAuthenticated, gradeController.update)

export { gradesRoutes }
