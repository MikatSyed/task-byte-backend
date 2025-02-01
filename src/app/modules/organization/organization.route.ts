import express from 'express'
import { OrganizationController } from './organization.controller'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */

const router = express.Router()



router.post(
  '/',
  auth(),
//   auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  OrganizationController.insertIntoDB
)
router.get(
  '/',
  auth(),
  OrganizationController.getAllFromDB
)
router.get('/:id', auth(), OrganizationController.getSingleFromDB);



// router.get(
//   '/my-profile',
//   auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
//   UserController.getLoggedUser
// )

// router.get('/', UserController.getAllUsers)
// router.patch('/:id', UserController.updateUser)
// router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser)
// router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser)

export const OrganizationRoutes = router;

