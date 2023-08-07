import { NextFunction, Request, Response } from 'express'
import { secret } from '@config'

import jwt from 'jsonwebtoken'

export const verifyAuthToken = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers.authorization

  if (!authHeader?.startsWith('Bearer') || !authHeader)
    return response.status(401).json('You are not authenticated!')

  const parts = authHeader.split(' ')

  if (parts.length !== 2)
    return response.status(401).send({ error: 'Token error' })

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme))
    return response.status(401).send({ error: 'Token malformated' })

  jwt.verify(token, secret, (error, decoded) => {
    if (error) return response.status(401).send({ error: 'Token Invalid' })

    // @ts-ignore
    request.collaborator = decoded
    return next()
  })
}

export const verifyAccessToken = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers.authorization

  if (!authHeader?.startsWith('Bearer') || !authHeader)
    return response.status(401).json('You are not authenticated!')

  const parts = authHeader.split(' ')

  if (parts.length !== 2)
    return response.status(401).send({ error: 'Token error' })

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme))
    return response.status(401).send({ error: 'Token malformated' })

  jwt.verify(token, secret, (error, decoded) => {
    if (error) return response.status(401).send({ error: 'Token Invalid' })

    // @ts-ignore
    request.token = decoded
    return next()
  })
}
