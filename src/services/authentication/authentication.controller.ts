import { sendResponse, sendBadRequest } from '@shared/helpers'
import { collaboratorRepository } from '@services/collaborator/collaborator.repository'
import { Request, Response } from 'express'
import { Collaborator } from '@shared/types'
import { hash, secret } from '@config'

import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'

const ERROR_MESSAGE = 'Usuário ou senha incorreta!'
const SESSION_DARATION = '7d'

export class AuthController {
  private generateAccessToken = (collaborator: Collaborator) =>
    jwt.sign({ id: collaborator.id, name: collaborator.id }, secret, {
      expiresIn: SESSION_DARATION,
    })

  private decryptPassword = (password: string) =>
    CryptoJS.AES.decrypt(password, hash).toString(CryptoJS.enc.Utf8)

  public login = async (request: Request, response: Response) => {
    const { superSecretPass, email } = request.body

    try {
      const colaborator = await collaboratorRepository.collaborator.findUnique({
        where: { email },
      })

      if (!colaborator)
        return sendBadRequest(request, response, { message: ERROR_MESSAGE })

      const hashedSuperSecretPass = this.decryptPassword(
        colaborator?.superSecretPass
      )

      if (hashedSuperSecretPass !== superSecretPass)
        return sendBadRequest(request, response, { message: ERROR_MESSAGE })

      // @ts-ignore
      delete colaborator.superSecretPass

      return sendResponse(response, {
        message: 'Login efetuado com sucesso!',
        data: { ...colaborator, token: this.generateAccessToken(colaborator) },
      })
    } catch (error) {
      return sendBadRequest(request, response, error, 500)
    }
  }
}
