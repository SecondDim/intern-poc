import { SwaggerRouter } from 'koa-swagger-decorator'

const protectedRouter = new SwaggerRouter()

// Swagger endpoint
protectedRouter.swagger({
  title: '',
  description: '',
  version: '0.0.1',
})

// mapDir will scan the input dir, and automatically call router.map to all Router Class
protectedRouter.mapDir(__dirname)

export { protectedRouter }
