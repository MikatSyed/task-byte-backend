import httpStatus from 'http-status'
import { IOrganization } from './Organization.interface'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { RequestHandler } from 'express'
import { OrganizationService } from './organization.service'
/* @typescript-eslint/no-explicit-any */

const insertIntoDB: RequestHandler = catchAsync(async (req, res, next) => {
    try {
      const { ...data } = req.body
      const user = req.user;
      const result = await OrganizationService.insertIntoDB(data,user)
  
      sendResponse<IOrganization>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Organization created successfully!',
        data: result,
      })
    } catch (err) {
      next(err)
    }
  })
const getAllFromDB: RequestHandler = catchAsync(async (req, res, next) => {
    try {
      const user = req.user;
      const result = await OrganizationService.getAllFromDB(user)
  
      sendResponse<any[]>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Organizations retrived successfully!',
        data: result,
      })
    } catch (err) {
      next(err)
    }
  })

  const getSingleFromDB:RequestHandler = catchAsync(async (req, res) => {
    const id = req.params.id
  
    const result = await OrganizationService.getSingleFromDB(id)
  
    sendResponse<IOrganization>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Organization retrieved successfully!',
      data: result,
    })
  })
  
// const getAllUsers = catchAsync(async (req: Request, res: Response) => {
//     const result = await OrganizationService.getAllOrganization()
  
//     sendResponse<IUser[]>(res, {
//       success: true,
//       statusCode: httpStatus.OK,
//       message: 'Users retrieved successfully !',
//       data: result,
//     })
//   })
  

// const getSingleOrganization = async (id: string): Promise<IOrganization | null> => {
//   const result = await Organization.findById({ _id: id })
//   if (!result) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Organization does not exist')
//   }
//   return result
// }

// const updateOrganization = async (
//   id: string,
//   payload: Partial<IOrganization>
// ): Promise<IOrganization | null> => {
//   const isExist = await Organization.findOne({ _id: id })

//   if (!isExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Organization not found !')
//   }

//   const { name, ...OrganizationData } = payload

//   const updatedOrganizationData: Partial<IOrganization> = { ...OrganizationData }

//   // dynamically handling
//   if (name && Object.keys(name).length > 0) {
//     Object.keys(name).forEach(key => {
//       const nameKey = `name.${key}` as keyof Partial<IOrganization> // `name.fisrtName`
//       ;(updatedOrganizationData as any)[nameKey] = name[key as keyof typeof name]
//     })
//   }

//   const result = await Organization.findOneAndUpdate({ _id: id }, updatedOrganizationData, {
//     new: true,
//   })

//   return result
// }

// const deleteOrganization = async (id: string): Promise<IOrganization | null> => {
//   const result = await Organization.findByIdAndDelete({ _id: id })
//   return result
// }

// const getLoggedOrganization = async (id: JwtPayload): Promise<IOrganization | null> => {
//   const result = await Organization.findById(id, {
//     name: 1,
//     phoneNumber: 1,
//     address: 1,
//     _id: 0,
//   })
//   if (!result) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Organization does not exist')
//   }
//   return result
// }
// const updateLoggedOrganization = async (
//   id: string,
//   payload: Partial<IOrganization>
// ): Promise<IOrganization | null> => {
//   const isExist = await Organization.findOne({ _id: id })

//   if (!isExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Organization not found !')
//   }

//   const { name, password, income, budget, ...OrganizationData } = payload

//   const updatedOrganizationData: Partial<IOrganization> = { ...OrganizationData }

//   // dynamically handling
//   if (name && Object.keys(name).length > 0) {
//     Object.keys(name).forEach(key => {
//       const nameKey = `name.${key}` as keyof Partial<IOrganization> // `name.fisrtName`
//       ;(updatedOrganizationData as any)[nameKey] = name[key as keyof typeof name]
//     })
//   }
//   // Hash the password if provided
//   if (password) {
//     const salt = await bcrypt.genSalt(10)
//     const hashedPassword = await bcrypt.hash(password, salt)
//     updatedOrganizationData.password = hashedPassword
//   }

//   const result = await Organization.findOneAndUpdate({ _id: id }, updatedOrganizationData, {
//     new: true,
//   }).select({ name: 1, phoneNumber: 1, address: 1, _id: 0 })

//   return result
// }

export const OrganizationController = {
    insertIntoDB,
    getAllFromDB,
    getSingleFromDB
//   getAllOrganizations,
//   getSingleOrganization,
//   updateOrganization,
//   deleteOrganization,
//   getLoggedOrganization,
//   updateLoggedOrganization,
}
