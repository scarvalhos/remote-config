import { sendBadRequest, sendResponse } from '@shared/helpers'
import { remoteConfigRepository } from './remote-config.repository'
import { Request, Response } from 'express'
import { RemoteConfig } from '@shared/types'

export class RemoteConfigController {
  public create = async (request: Request, response: Response) => {
    const payload: RemoteConfig = request.body

    try {
      const config = await remoteConfigRepository.remoteConfig.create({
        data: { ...payload },
      })

      return sendResponse(response, {
        message: 'Nova configuração criada com sucesso.',
        data: config,
      })
    } catch (error) {
      return sendBadRequest(request, response, error, 500)
    }
  }

  public find = async (request: Request, response: Response) => {
    const { key } = request.params

    try {
      const config = await remoteConfigRepository.remoteConfig.findUnique({
        where: { key },
      })

      if (!config?.id)
        return sendBadRequest(request, response, {
          message: 'Configuração não encontrada.',
        })

      return sendResponse(response, {
        message: 'Configuração encontrada.',
        data: config,
      })
    } catch (error) {
      return sendBadRequest(request, response, error, 500)
    }
  }

  public list = async (request: Request, response: Response) => {
    try {
      const { configs, count } = await remoteConfigRepository.list()

      if (count === 0)
        return sendResponse(response, {
          message: 'Nenhum configuração encontrada.',
          data: { configs, count },
        })

      return sendResponse(response, {
        message: 'Configurações encontradas.',
        data: { configs, count },
      })
    } catch (error) {
      return sendBadRequest(request, response, error, 500)
    }
  }

  public update = async (request: Request, response: Response) => {
    const { key } = request.params
    const payload: RemoteConfig = request.body

    try {
      const config = await remoteConfigRepository.remoteConfig.update({
        where: { key },
        data: { ...payload },
      })

      if (!config?.id)
        return sendBadRequest(request, response, {
          message: 'Configuração não encontrada.',
        })

      return sendResponse(response, {
        message: 'Configuração atualizada.',
        data: config,
      })
    } catch (error) {
      return sendBadRequest(request, response, error, 500)
    }
  }

  public delete = async (request: Request, response: Response) => {
    const { key } = request.params

    try {
      const config = await remoteConfigRepository.remoteConfig.findUnique({
        where: { key },
      })

      if (!config?.id)
        return sendBadRequest(request, response, {
          message: 'Configuração não encontrada.',
        })

      await remoteConfigRepository.remoteConfig.delete({
        where: { key },
      })

      return sendResponse(response, {
        message: 'Configuração excluída.',
        data: config,
      })
    } catch (error) {
      return sendBadRequest(request, response, error, 500)
    }
  }
}

export const remoteConfigController = new RemoteConfigController()
