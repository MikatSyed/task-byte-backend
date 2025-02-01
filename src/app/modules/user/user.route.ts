import express from 'express'
import { UserController } from './user.controller'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */

const router = express.Router()

router.patch(
  '/my-profile',
  auth(),
  UserController.updateLoggedUser
)

router.get(
  '/my-profile',
  auth(),
  UserController.getLoggedUser
)

router.get('/', auth(), UserController.getAllUsers)
router.patch('/:id', auth(), UserController.updateUser)
router.get('/:id', auth(), UserController.getSingleUser)
router.delete('/:id', auth(), UserController.deleteUser)

export const UserRoutes = router;

