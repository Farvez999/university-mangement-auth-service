import { IGenericErrorMessage } from './error'

export type IGenericErrorResponse = {
  statusCode: number
  mesage: string
  errorMessage: IGenericErrorMessage[]
}

export type IGenericResponse<T> = {
  meta: {
    page: number
    limit: number
    total: number
  }
  data: T
}
