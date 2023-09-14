import { Router } from 'express'
import { usersRoutes } from './users'
import { studentsRoutes } from './students'
import { subjectsRoutes } from './subjects'
import { warningsRoutes } from './warnings'
import { authenticateRoutes } from './authenticate'

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/students', studentsRoutes)
routes.use('/subjects', subjectsRoutes)
routes.use('/warnings', warningsRoutes)
routes.use(authenticateRoutes)

export { routes }
