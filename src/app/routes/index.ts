import express from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { AuthRoute } from '../modules/auth/auth.route'
import { OrganizationRoutes } from '../modules/organization/organization.route'
import { InvitationRoutes } from '../modules/invitation/invitation.route'
import { TaskRoutes } from '../modules/task/task.route'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/organization',
    route: OrganizationRoutes,
  },
  {
    path: '/invitation',
    route: InvitationRoutes,
  },
  {
    path: '/task',
    route: TaskRoutes,
  }
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
