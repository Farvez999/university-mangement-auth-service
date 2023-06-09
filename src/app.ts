import express, { Application } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import routes from './app/routes'

const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Application route
// app.use('/api/v1/users', UserRoutes)
// app.use('/api/v1/academic-semesters', AcademicSemesterRoutes)
app.use('/api/v1/', routes)

//Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   Promise.reject(new Error('unhandledRejection'))
//   // res.send('Working Successfully')
//   // throw new ApiError(400, 'Ore baba error')
//   // next('ore baba error')
// })

// Global error handler
app.use(globalErrorHandler)

export default app
