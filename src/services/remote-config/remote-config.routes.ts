import express from 'express'

import { verifyAccessToken, verifyAuthToken } from '@shared/middlewares'
import { remoteConfigController } from './remote-config.controller'

const router = express.Router()

router.post(
  '/api/remote-config/',
  verifyAuthToken,
  remoteConfigController.create
)

router.get('/api/remote-config/', verifyAuthToken, remoteConfigController.list)

router.get(
  '/api/remote-config/:key',
  verifyAccessToken,
  remoteConfigController.find
)

router.put(
  '/api/remote-config/:key',
  verifyAuthToken,
  remoteConfigController.update
)

router.delete(
  '/api/remote-config/:key',
  verifyAuthToken,
  remoteConfigController.delete
)

export default router
