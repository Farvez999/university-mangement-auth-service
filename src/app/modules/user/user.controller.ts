import { Request, RequestHandler, Response } from 'express'
import { UserService } from './user.services'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'

const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { user } = req.body
    const result = await UserService.createUser(user)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully!',
      data: result,
    })
  }
)

export const UserController = {
  createStudent,
}
