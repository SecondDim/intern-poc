import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

export interface Config {
  server: ServerConfig;
}

export interface ServerConfig {
  port: number;
  debugLogging: boolean;
  cronJobExpression: string;
}

const isDevMode = process.env.NODE_ENV === 'development'

const config: Config = {
  server: {
    port: +(process.env.PORT || 3000),
    debugLogging: isDevMode,
    cronJobExpression: '0 * * * *',
  },
}

export { config }
