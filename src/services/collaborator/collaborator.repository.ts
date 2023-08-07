import { Prisma } from '@libs/prisma'

export class CollaboratorRepository extends Prisma {
  public findUnique = async (id: string) => {
    const collaborator = await this.collaborator.findUnique({
      where: { id },
    })

    if (collaborator) {
      // @ts-expect-error
      delete collaborator.superSecretPass
    }

    return collaborator
  }

  public findUniqueByEmail = async (email: string) => {
    const collaborator = await this.collaborator.findUnique({
      where: { email },
    })

    if (collaborator) {
      // @ts-expect-error
      delete collaborator.superSecretPass
    }

    return collaborator
  }

  public list = async () => {
    const collaborators = await this.collaborator.findMany()
    const count = await this.collaborator.count()

    return { collaborators, count }
  }
}

export const collaboratorRepository = new CollaboratorRepository()
