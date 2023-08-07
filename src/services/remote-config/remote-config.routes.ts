import express from 'express'

import { verifyAccessToken, verifyAuthToken } from '@shared/middlewares'
import { remoteConfigController } from './remote-config.controller'

const router = express.Router()

router.post(
  '/api/remote-config/',
  verifyAuthToken,
  remoteConfigController.create
  // #swagger.tags = ['Remote Config']
)

router.get(
  '/api/remote-config/',
  verifyAuthToken,
  remoteConfigController.list
  // #swagger.tags = ['Remote Config']
)

router.get(
  '/api/remote-config/:key',
  verifyAccessToken,
  remoteConfigController.find
  // #swagger.tags = ['Remote Config']
)

router.put(
  '/api/remote-config/:key',
  verifyAuthToken,
  remoteConfigController.update
  // #swagger.tags = ['Remote Config']
)

router.delete(
  '/api/remote-config/:key',
  verifyAuthToken,
  remoteConfigController.delete
  // #swagger.tags = ['Remote Config']
)

export default router
