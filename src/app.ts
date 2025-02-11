import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import routes from './app/routes/index'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { NextFunction } from 'connect'
import httpStatus from 'http-status'
import cookieParser from 'cookie-parser'

const app: Application = express()


// Allow CORS from specified origins
const allowedOrigins =['http://localhost:3000','http://localhost:3001','https://task-byte.vercel.app']


const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(corsOptions));


app.use(cors())
app.use(cookieParser())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/', routes)

app.use(globalErrorHandler)

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  })
  next()
})

export default app
