const swaggerAutogen = require('swagger-autogen')()
const path = require('path')

const outputFile = './swagger.json'

const endpointsFiles = [
  path.join(__dirname, '..', 'services/access-token/access-token.routes.ts'),
  path.join(
    __dirname,
    '..',
    'services/authentication/authentication.routes.ts'
  ),
  path.join(__dirname, '..', 'services/collaborator/collaborator.routes.ts'),
  path.join(__dirname, '..', 'services/remote-config/remote-config.routes.ts'),
]

const doc = {
  info: {
    version: '0.0.1',
    title: 'Remote Config API',
    description:
      'REST API that implements feature toggle and access tokens creation.',
  },
  host: process.env.APP_URL,
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  servers: [
    {
      url: 'http://localhost:8081',
      description: 'local server',
    },
  ],
  tags: [
    {
      name: 'Collaborator',
      description: '',
    },
    {
      name: 'Authentication',
      description: '',
    },
    {
      name: 'Access Token',
      description: '',
    },
    {
      name: 'Remote Config',
      description: '',
    },
  ],
}

swaggerAutogen(outputFile, endpointsFiles, doc)
