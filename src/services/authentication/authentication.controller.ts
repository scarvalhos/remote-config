import { sendResponse, sendBadRequest } from '@shared/helpers'
import { collaboratorRepository } from '@services/collaborator/collaborator.repository'
import { Request, Response } from 'express'
import { Collaborator } from '@shared/types'
import { hash, secret } from '@config'

import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'

const ERROR_MESSAGE = 'Usuário ou senha incorreta!'

export class AuthController {
  private generateAccessToken = (collaborator: Collaborator) =>
    jwt.sign({ id: collaborator.id, name: collaborator.id }, secret, {
      expiresIn: '7d',
    })

  private decryptPass = (pass: string) =>
    CryptoJS.AES.decrypt(pass, hash).toString(CryptoJS.enc.Utf8)

  public login = async (request: Request, response: Response) => {
    const { superSecretPass, email } = request.body

    try {
      const colaborator = await collaboratorRepository.findUniqueByEmail(email)

      if (!colaborator)
        return sendBadRequest(request, response, { message: ERROR_MESSAGE })

      const hashedSuperSecretPass = this.decryptPass(
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
