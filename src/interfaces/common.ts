import { IGenericErrorMessage } from './error'

export type IGenericErrorResponse = {
  statusCode: number
  mesage: string
  errorMessage: IGenericErrorMessage[]
}
