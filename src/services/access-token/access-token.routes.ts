import express from 'express'

import { accessTokenController } from './access-token.controller'
import { verifyAuthToken } from '@shared/middlewares'

const router = express.Router()

router.post('/api/access-token', verifyAuthToken, accessTokenController.create)
router.get('/api/access-token', verifyAuthToken, accessTokenController.list)

router.delete(
  '/api/access-token/:id',
  verifyAuthToken,
  accessTokenController.delete
)

export default router
