import { collaboratorController } from './collaborator.controller'
import { verifyAuthToken } from '@shared/middlewares'

import express from 'express'

const router = express.Router()

router.post('/api/collaborator/', collaboratorController.create)
router.get('/api/collaborator/', verifyAuthToken, collaboratorController.list)
router.get('/api/collaborator/me', verifyAuthToken, collaboratorController.me)

router.delete(
  '/api/collaborator/:id',
  verifyAuthToken,
  collaboratorController.delete
)

router.get(
  '/api/collaborator/:id',
  verifyAuthToken,
  collaboratorController.find
)

router.put(
  '/api/collaborator/:id',
  verifyAuthToken,
  collaboratorController.update
)

export default router
