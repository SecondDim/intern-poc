import { Context } from 'koa'
import { config } from '../config'
import { transports, format, createLogger } from 'winston'

const transportsConfig = {
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.align(),
    format.printf(
      info => `${info.timestamp} - ${info.level}: ${info.message}`,
    ),
  ),
}

const logger = createLogger({
  level: config.server.debugLogging ? 'debug' : 'info',
  transports: [
    // - Write to all logs with specified level to console.
    new transports.Console(transportsConfig),
  ],
})

const logWithKao = (winstonInstance: any): any => {
  winstonInstance.configure({
    level: config.server.debugLogging ? 'debug' : 'info',
    transports: [
      //
      // - Write all logs error (and below) to `error.log`.
      // new transports.File({ filename: 'error.log', level: 'error' }),
      //
      // - Write to all logs with specified level to console.
      new transports.Console(transportsConfig),
    ],
  })

  return async (ctx: Context, next: () => Promise<any>): Promise<void> => {
    const start = new Date().getTime()

    await next()

    const ms = new Date().getTime() - start

    let logLevel: string
    if (ctx.status >= 500) {
      logLevel = 'error'
    } else if (ctx.status >= 400) {
      logLevel = 'warn'
    } else {
      logLevel = 'info'
    }

    const msg = `${ctx.method} ${ctx.originalUrl} ${ctx.status} ${ms}ms`

    winstonInstance.log(logLevel, msg)
  }
}

export { logger, logWithKao }
