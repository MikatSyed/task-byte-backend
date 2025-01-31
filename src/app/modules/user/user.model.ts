import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../../config'
const UserSchema = new Schema<IUser>(
  {
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  organizations: [{ type: Schema.Types.ObjectId, ref: 'Organization' }],
  },
  {
    timestamps: true,
  }
)

UserSchema.pre('save', async function (next) {
  // hashing user password
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycrypt_salt_rounds)
  )
  next()
})

UserSchema.statics.isUserExist = async function (
  phoneNumber: string
): Promise<Pick<IUser, 'password' | 'email'  | '_id'> | null> {
  return await User.findOne(
    { phoneNumber },
    { password: 1, role: 1, phoneNumber: 1 }
  )
}
UserSchema.statics.isVarifiedUserExist = async function (
  id: string
): Promise<Pick<IUser, 'password' | 'email'  | '_id'> | null> {
  console.log(id)
  return await User.findOne(
    { _id: id },
    { password: 1, role: 1, phoneNumber: 1 }
  )
}

UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  const result = await bcrypt.compare(givenPassword, savedPassword)
  console.log(result)
  return result
}

export const User = model<IUser, UserModel>('User', UserSchema)
