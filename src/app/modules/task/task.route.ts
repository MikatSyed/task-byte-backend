import express from 'express'
import { TaskController } from './task.controller'
import auth from '../../middlewares/auth'

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */

const router = express.Router()

router.get(
    '/user',
    auth(),
    TaskController.getAllFromDBForSpecificUser
  )

router.post(
  '/',
  auth(),
//   auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  TaskController.insertIntoDB
)
router.get(
  '/organization/:id',
  TaskController.getAllFromDBForOrganization
)
router.get('/:id', auth(), TaskController.getSingleFromDB);


router.get('/:id', auth(), TaskController.getSingleFromDB);

router.patch('/:id', auth(), TaskController.updateTask);

router.delete('/:id', auth(), TaskController.deleteTask);

export const TaskRoutes = router;

