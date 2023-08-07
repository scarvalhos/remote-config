import { accessTokenRouter } from '@services/access-token'
import { collaboratorRouter } from '@services/collaborator'
import { remoteConfigRouter } from '@services/remote-config'
import { authRouter } from '@services/authentication'
import { Router } from 'express'

const routes: Router[] = [
  remoteConfigRouter,
  collaboratorRouter,
  accessTokenRouter,
  authRouter,
]

export default routes
