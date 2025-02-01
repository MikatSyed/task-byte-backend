import httpStatus from 'http-status'
import { ITask } from './task.interface'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { RequestHandler } from 'express'
import { TaskService } from './task.service'
/* @typescript-eslint/no-explicit-any */

const insertIntoDB: RequestHandler = catchAsync(async (req, res, next) => {
    try {
      const { ...data } = req.body
      const user = req.user;
      const result = await TaskService.insertIntoDB(data,user)
  
      sendResponse<ITask>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Task created successfully!',
        data: result,
      })
    } catch (err) {
      next(err)
    }
  })
const getAllFromDBForOrganization: RequestHandler = catchAsync(async (req, res, next) => {
    try {
        const id = req.params.id
      const result = await TaskService.getAllFromDBForOrganization(id)
  
      sendResponse<any[]>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Tasks retrived successfully!',
        data: result,
      })
    } catch (err) {
      next(err)
    }
  })
const getAllFromDBForSpecificUser: RequestHandler = catchAsync(async (req, res, next) => {
    try {
        const user = req.user;
      const result = await TaskService.getAllFromDBForSpecificUser(user)
  
      sendResponse<any[]>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Tasks retrived successfully!',
        data: result,
      })
    } catch (err) {
      next(err)
    }
  })

  const getSingleFromDB:RequestHandler = catchAsync(async (req, res) => {
    const id = req.params.id
  
    const result = await TaskService.getSingleFromDB(id)
  
    sendResponse<ITask>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Task retrieved successfully!',
      data: result,
    })
  })


  const updateTask:RequestHandler = catchAsync(async (req, res) => {
    const id = req.params.id
  
    const result = await TaskService.updateTask(id,req.body)
  
    sendResponse<ITask>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Task updated successfully!',
      data: result,
    })
  })

  const deleteTask:RequestHandler = catchAsync(async (req, res) => {
    const id = req.params.id
  
    const result = await TaskService.deleteTask(id)
  
    sendResponse<ITask>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Task deleted successfully!',
      data: result,
    })
  })
  

export const TaskController = {
    insertIntoDB,
    getAllFromDBForOrganization,
    getAllFromDBForSpecificUser,
    getSingleFromDB,
    updateTask,
    deleteTask
//   getAllTasks,
//   getSingleTask,
//   updateTask,
//   deleteTask,
//   getLoggedTask,
//   updateLoggedTask,
}
