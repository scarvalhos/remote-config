import { randomUUID } from 'crypto'
export const uuid = () => randomUUID().toString()

export * from './sendBadRequest'
export * from './sendResponse'
