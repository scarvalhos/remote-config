export * from './routes.config'
export * from './server.config'

export const SERVER_PORT = process.env.PORT
export const secret = process.env.SECRET as string
export const hash = process.env.HASH as string
