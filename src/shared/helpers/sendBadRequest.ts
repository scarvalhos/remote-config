import { Request, Response } from 'express'

export const sendBadRequest = (
  req: Request,
  res: Response,
  error: unknown,
  status?: number
) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(
      `${req.method} ${req.originalUrl} - ${(error as any).message}`
    )
    console.error(error)
  }

  res.status(status || 400).json({
    message: (error as any).message || 'Erro interno do servidor.',
  })
}
