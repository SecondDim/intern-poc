require('dotenv/config')

module.exports = {
  type: process.env.TYPEORM_TYPE || 'postgres',
  host: process.env.TYPEORM_HOST || 'localhost',
  port: process.env.TYPEORM_PORT || '5432',
  username: process.env.TYPEORM_USERNAME || '',
  password: process.env.TYPEORM_PASSWORD || '',
  database: process.env.TYPEORM_DATABASE || 'test',
  synchronize: process.env.TYPEORM_SYNCHRONIZE || false,
  logging: process.env.TYPEORM_LOGGING || false,
  entities: [
    (process.env.NODE_ENV === 'develop') ? 'src/db/entity/*.ts!(Base.ts)' : 'dist/db/entity/*.ts!(Base.ts)',
  ],
  migrations: [
    (process.env.NODE_ENV === 'develop') ? 'src/db/migration/*.ts' : 'dist/db/migration/*.js',
  ],
  seeds: [
    (process.env.NODE_ENV === 'develop') ? 'src/db/seed/*.ts' : 'dist/db/seed/*.js',
  ],
  cli: {
    entitiesDir: 'src/db/entity',
    migrationsDir: 'src/db/migration',
  },
}
