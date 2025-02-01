import { z } from 'zod'

const registerUserZodSchema = z.object({
  body: z.object({
  
  
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
})

const loginZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'email Number is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
})

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
})

export const AuthValidation = {
  registerUserZodSchema,
  loginZodSchema,
  refreshTokenZodSchema,
}
