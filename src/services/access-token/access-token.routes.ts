import express from 'express'

import { accessTokenController } from './access-token.controller'
import { verifyAuthToken } from '@shared/middlewares'

const router = express.Router()

router.post(
  '/api/access-token',
  verifyAuthToken,
  accessTokenController.create
  // #swagger.tags = ['Access Token']
)

router.get(
  '/api/access-token',
  verifyAuthToken,
  accessTokenController.list
  // #swagger.tags = ['Access Token']
)

router.delete(
  '/api/access-token/:id',
  verifyAuthToken,
  accessTokenController.delete
  // #swagger.tags = ['Access Token']
)

export default router
