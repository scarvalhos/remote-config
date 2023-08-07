import 'dotenv/config'

import { SERVER_PORT, runServer } from '@config'

runServer({
  port: SERVER_PORT,
  success: `Backend is running at port: ${SERVER_PORT}`,
})
