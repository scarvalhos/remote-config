import { collaboratorController } from './collaborator.controller'
import { verifyAuthToken } from '@shared/middlewares'

import express from 'express'

const router = express.Router()

router.post(
  '/api/collaborator/',
  collaboratorController.create
  // #swagger.tags = ['Collaborator']
)
router.get(
  '/api/collaborator/',
  verifyAuthToken,
  collaboratorController.list
  // #swagger.tags = ['Collaborator']
)
router.get(
  '/api/collaborator/me',
  verifyAuthToken,
  collaboratorController.me
  // #swagger.tags = ['Collaborator']
)

router.delete(
  '/api/collaborator/:id',
  verifyAuthToken,
  collaboratorController.delete
  // #swagger.tags = ['Collaborator']
)

router.get(
  '/api/collaborator/:id',
  verifyAuthToken,
  collaboratorController.find
  // #swagger.tags = ['Collaborator']
)

router.put(
  '/api/collaborator/:id',
  verifyAuthToken,
  collaboratorController.update
  // #swagger.tags = ['Collaborator']
)

export default router
