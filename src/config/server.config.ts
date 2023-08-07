import swaggerFile from '@libs/swagger.json'
import swaggerUi from 'swagger-ui-express'
import express, { Express } from 'express'
import routes from '@routes'
import cors from 'cors'

import { routesInitializer } from './routes.config'
import { prisma } from '@libs/prisma'

export const serverConfig = (server: Express) => {
  server.use(cors({ origin: '*' }))
  server.use(express.json())
  server.use(express.urlencoded({ extended: true }))
  server.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerFile))
}

type RunServer = {
  port?: number | string
  success?: string
}

export const runServer = async ({ port, success }: RunServer) => {
  const server = express()

  serverConfig(server)
  routesInitializer(server, routes)

  prisma.testConnection()

  return server.listen(port, () => console.log(success))
}
