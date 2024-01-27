import { GradeController } from '../../../../controllers/GradeController'
import express from 'express'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const gradesRoutes = express.Router()
const gradeController = new GradeController()

gradesRoutes.get('/subject/:idSubject', ensureAuthenticated, gradeController.listBySubject)

gradesRoutes.get('/student/:idStudent', ensureAuthenticated, gradeController.listByStudent)

gradesRoutes.put('/:idGrade', ensureAuthenticated, gradeController.update)

export { gradesRoutes }
