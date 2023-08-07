import { AuthController } from './authentication.controller'

import express from 'express'

const router = express.Router()

const authController = new AuthController()

router.post('/api/auth/', authController.login)

export default router
