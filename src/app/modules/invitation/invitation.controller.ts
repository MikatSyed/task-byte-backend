import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { RequestHandler } from 'express'

import { IInvitation } from './invitation.interface'
import { InvitationService } from './invitation.service'
/* @typescript-eslint/no-explicit-any */

const insertIntoDB: RequestHandler = catchAsync(async (req, res, next) => {
    try {
      const { ...data } = req.body;
      const result = await InvitationService.insertIntoDB(data);
  
      // Type check to handle ApiError
      if (Array.isArray(result)) {
        sendResponse<IInvitation[]>(res, {
          success: true,
          statusCode: httpStatus.OK,
          message: 'Invitation created successfully!',
          data: result,
        });
      } else {
        // If result is an ApiError, handle it (you can customize this based on your logic)
        next(result); // Assuming 'result' is an instance of ApiError
      }
    } catch (err) {
      next(err);
    }
  });
  
const getAllFromDB: RequestHandler = catchAsync(async (req, res, next) => {
    try {
      const user = req.user;
      const result = await InvitationService.getAllFromDB(user)
  
      sendResponse<any[]>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Invitation retrived successfully!',
        data: result,
      })
    } catch (err) {
      next(err)
    }
  })

  const updateInvitationStatus:RequestHandler = catchAsync(async (req, res) => {
    const id = req.params.id; 
    const { status } = req.body; 
    console.log(req.body,'44')
  
    // Validate status value
    if (!['pending', 'accepted', 'rejected'].includes(status)) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Invalid status value. Allowed values: pending, accepted, rejected',
      });
    }
  
    const result = await InvitationService.updateInvitationStatus(id, status);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Invitation status updated successfully!',
      data: result,
    });
  });

  
  

export const InvitationController = {
    insertIntoDB,
    getAllFromDB,
    updateInvitationStatus

}
