import { sendBadRequest, sendResponse } from '@shared/helpers'
import { collaboratorRepository } from '@services/collaborator/collaborator.repository'
import { accessTokenRepository } from './access-token.repository'
import { Request, Response } from 'express'

export class AccessTokenController {
  public create = async (request: Request, response: Response) => {
    // @ts-ignore
    const { collaborator } = request

    try {
      const collaboratorFinded = await collaboratorRepository.findUnique(
        collaborator.id
      )

      if (!collaboratorFinded)
        return sendBadRequest(request, response, {
          message: 'Colaborador não encontrado.',
        })

      const accessToken = await accessTokenRepository.create(collaboratorFinded)

      return sendResponse(response, {
        message: 'Novo token criado com sucesso.',
        data: accessToken,
      })
    } catch (error) {
      return sendBadRequest(request, response, error, 500)
    }
  }

  public list = async (request: Request, response: Response) => {
    try {
      const { accessTokens, count } = await accessTokenRepository.list()

      if (count === 0)
        return sendResponse(response, {
          message: 'Nenhum token encontrado.',
          data: { accessTokens, count },
        })

      return sendResponse(response, {
        message: 'Tokens encontradas.',
        data: { accessTokens, count },
      })
    } catch (error) {
      return sendBadRequest(request, response, error, 500)
    }
  }

  public delete = async (request: Request, response: Response) => {
    const { id } = request.params

    try {
      const accessToken = await accessTokenRepository.accessToken.findUnique({
        where: { id },
      })

      if (!accessToken?.id)
        return sendBadRequest(request, response, {
          message: 'Token não encontrado.',
        })

      await accessTokenRepository.accessToken.delete({
        where: { id },
      })

      return sendResponse(response, {
        message: 'Token excluída.',
        data: accessToken,
      })
    } catch (error) {
      return sendBadRequest(request, response, error, 500)
    }
  }
}

export const accessTokenController = new AccessTokenController()
