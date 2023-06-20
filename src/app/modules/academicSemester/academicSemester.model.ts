import { Schema, model } from 'mongoose'
import {
  IAcademicSemester,
  AcademicSemesterModel,
} from './academicSemester.interface'
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.constant'
import ApiError from '../../../errors/ApiError'
import status from 'http-status'

const AcademicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemesterTitles,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCodes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

// Handling Same year and same semester issue
AcademicSemesterSchema.pre('save', async function (next) {
  const isExit = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  })
  if (isExit) {
    throw new ApiError(status.CONFLICT, 'Academic semester is already exit!')
  }
  next()
})

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  AcademicSemesterSchema
)
