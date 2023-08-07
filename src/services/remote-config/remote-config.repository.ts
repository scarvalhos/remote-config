import { Prisma } from '@libs/prisma'

export class RemoteConfigRepository extends Prisma {
  public list = async () => {
    const configs = await this.remoteConfig.findMany()
    const count = await this.remoteConfig.count()

    return { configs, count }
  }
}

export const remoteConfigRepository = new RemoteConfigRepository()
