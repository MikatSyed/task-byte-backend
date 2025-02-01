import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IUser } from './user.interface'
import { User } from './user.model'
import { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
/* @typescript-eslint/no-explicit-any */

const getAllUsers = async (id: string): Promise<{ id: string; name: string }[]> => {
  const users = await User.find({ _id: { $ne: id } }).select("_id name"); // Exclude the given ID and select only required fields

  return users.map(user => ({
    id: user._id.toString(), // Convert ObjectId to string
    name: user.name
  }));
};


const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById({ _id: id })
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }
  return result
}

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isExist = await User.findOne({ _id: id })

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !')
  }

  const { name, ...UserData } = payload

  const updatedUserData: Partial<IUser> = { ...UserData }

  // dynamically handling
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IUser> // `name.fisrtName`
      ;(updatedUserData as any)[nameKey] = name[key as keyof typeof name]
    })
  }

  const result = await User.findOneAndUpdate({ _id: id }, updatedUserData, {
    new: true,
  })

  return result
}

const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete({ _id: id })
  return result
}

const getLoggedUser = async (id: JwtPayload): Promise<IUser | null> => {
  const result = await User.findById(id, {
    name: 1,
    email: 1,

    _id: 0,
  })
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }
  return result
}
const updateLoggedUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isExist = await User.findOne({ _id: id })

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !')
  }

  

  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).select({ name: 1, phoneNumber: 1, address: 1, _id: 0 })

  return result
}

export const userService = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getLoggedUser,
  updateLoggedUser,
}
