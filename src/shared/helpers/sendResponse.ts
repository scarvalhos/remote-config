import { Response } from 'express'

export const sendResponse = (
  res: Response,
  {
    data,
    message,
    status = 200,
  }: {
    data?: unknown
    message: string
    status?: number
  }
) => {
  return res.status(status).json({
    message,
    data,
  })
}
