import { Express, Router } from 'express'

export const routesInitializer = (server: Express, routes: Router[]) => {
  for (const router of routes) {
    server.use(router)
  }
}
