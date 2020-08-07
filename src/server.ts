import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import winston from 'winston'
import { createConnection } from 'typeorm'
import { logger, logWithKao } from './util/logger'
import { errorHandler } from './util/errors'
import { config } from './config'
import { protectedRouter } from './protectedRoutes'
import { cron } from './cron'

// create connection with database
// note that its not active database connection
// TypeORM creates you connection pull to uses connections from pull on your requests
createConnection().then(async () => {
  const app = new Koa()

  // Logger middleware -> use winston as logger (logging.ts with config)
  app.use(logWithKao(winston))

  // Enable bodyParser with default options
  app.use(bodyParser())

  //
  app.use(errorHandler())

  // These routes include middleware to respond with "Method Not Allowed - 405".
  app.use(protectedRouter.routes()).use(protectedRouter.allowedMethods())

  // Register cron job to do any action needed
  cron.start()

  app.listen(config.server.port)

  logger.info(`Server running on port ${config.server.port}`)

  // logger.error('logger console error')     // 0
  // logger.warn('logger console warn')       // 1
  // logger.info('logger console info')       // 2
  // logger.http('logger console http')       // 3
  // logger.verbose('logger console verbose') // 4
  // logger.debug('logger console debug')     // 5
  // logger.silly('logger console debug')     // 6
}).catch((error: string) => console.log('TypeORM connection error: ', error))
