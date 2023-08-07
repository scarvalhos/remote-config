import { Collaborator } from '@shared/types'
import { Prisma } from '@libs/prisma'
import { secret } from '@config'

import jwt from 'jsonwebtoken'

export class AccessTokenRepository extends Prisma {
  private generateAccessToken = (collaborator: Collaborator) =>
    jwt.sign(
      {
        id: collaborator.id,
        name: collaborator.id,
      },
      secret,
      { expiresIn: '90d' }
    )

  public create = async (collaborator: Collaborator) => {
    const token = await this.accessToken.create({
      data: { token: this.generateAccessToken(collaborator) },
    })

    return token
  }

  public list = async () => {
    const accessTokens = await this.accessToken.findMany()
    const count = await this.accessToken.count()

    return { accessTokens, count }
  }
}

export const accessTokenRepository = new AccessTokenRepository()
