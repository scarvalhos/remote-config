import { PrismaClient } from '@prisma/client'

class Prisma extends PrismaClient {
  public async testConnection() {
    try {
      await this.remoteConfig
        .findFirst()
        .then(() => console.log('Conectado ao PostgreSQL'))
    } catch (error) {
      console.error('Falha ao conectar ao PostgreSQL')
    }
  }
}

const prisma = new Prisma()

export { prisma, Prisma }
