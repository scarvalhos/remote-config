import { sendBadRequest, sendResponse } from '@shared/helpers'
import { collaboratorRepository } from './collaborator.repository'
import { Request, Response } from 'express'
import { Collaborator } from '@shared/types'
import { hash } from '@config'

import CryptoJS from 'crypto-js'

export class CollaboratorController {
  private encryptPass = (pass: string) =>
    CryptoJS.AES.encrypt(pass, hash).toString()

  public create = async (request: Request, response: Response) => {
    const { superSecretPass, ...payload }: Collaborator = request.body

    try {
      const colaborator = await collaboratorRepository.findUniqueByEmail(
        payload.email
      )

      if (colaborator)
        return sendBadRequest(request, response, {
          message: 'Colaborador já cadastrado.',
        })

      const newColaborator = await collaboratorRepository.collaborator.create({
        data: {
          ...payload,
          superSecretPass: this.encryptPass(superSecretPass),
        },
      })

      return sendResponse(response, {
        message: 'Colaborador criado com sucesso.',
        data: newColaborator,
      })
    } catch (error) {
      return sendBadRequest(request, response, error, 500)
    }
  }

  public find = async (request: Request, response: Response) => {
    try {
      const collaborator = await collaboratorRepository.findUnique(
        request.params.id
      )

      if (!collaborator)
        return sendBadRequest(request, response, {
          message: 'Colaborador não encontrado',
        })

      return sendResponse(response, {
        message: 'Colaborador encontrado.',
        data: collaborator,
      })
    } catch (error) {
      return sendBadRequest(request, response, error, 500)
    }
  }

  public list = async (request: Request, response: Response) => {
    try {
      const { collaborators, count } = await collaboratorRepository.list()

      if (count === 0)
        return sendResponse(response, {
          message: 'Nenhum colaborador encontrado.',
          data: { collaborators, count },
        })

      return sendResponse(response, {
        message: 'Colaboradores encontrados.',
        data: { collaborators, count },
      })
    } catch (error) {
      return sendBadRequest(request, response, error, 500)
    }
  }

  public delete = async (request: Request, response: Response) => {
    const { id } = request.params

    try {
      const collaborator = await collaboratorRepository.findUnique(id)

      if (!collaborator)
        return sendBadRequest(request, response, {
          message: 'Colaborador não encontrado.',
        })

      await collaboratorRepository.collaborator.delete({ where: { id } })

      return sendResponse(response, {
        message: 'Colaborador excluído.',
      })
    } catch (error) {
      return sendBadRequest(request, response, error, 500)
    }
  }

  public update = async (request: Request, response: Response) => {
    let { id } = request.params

    let payload = request.body

    try {
      const collaborator = await collaboratorRepository.findUnique(id)

      if (!collaborator)
        return sendBadRequest(request, response, {
          message: 'Colaborador não encontrado.',
        })

      const collaboratorUpdated =
        await collaboratorRepository.collaborator.update({
          where: { id },
          data: {
            ...payload,
            ...(payload.superSecretPass && {
              superSecretPass: this.encryptPass(payload.superSecretPass),
            }),
          },
        })

      return response.status(200).json({
        message: 'Colaborador atualizado com sucesso.',
        user: collaboratorUpdated,
      })
    } catch (error) {
      return sendBadRequest(request, response, error, 500)
    }
  }

  public me = async (request: Request, response: Response) => {
    // @ts-ignore
    const { collaborator } = request

    try {
      const me = await collaboratorRepository.findUnique(collaborator.id)

      if (!me)
        return sendBadRequest(request, response, {
          message: 'Colaborador não encontrado.',
        })

      return sendResponse(response, {
        message: 'Colaborador encontrado.',
        data: me,
      })
    } catch (error) {
      return sendBadRequest(request, response, error, 500)
    }
  }
}

export const collaboratorController = new CollaboratorController()
