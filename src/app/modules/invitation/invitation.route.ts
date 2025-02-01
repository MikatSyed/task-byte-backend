import express from 'express'
import { InvitationController } from './invitation.controller'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */

const router = express.Router()

router.post(
  '/',
  auth(),
//   auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
InvitationController.insertIntoDB
)
router.get(
  '/',
  auth(),
  InvitationController.getAllFromDB
)

router.patch('/:id/status', auth(), InvitationController.updateInvitationStatus);

// router.get(
//   '/my-profile',
//   auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
//   UserController.getLoggedUser
// )

// router.get('/', UserController.getAllUsers)
// router.patch('/:id', UserController.updateUser)
// router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser)
// router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser)

export const InvitationRoutes = router;

