import 'reflect-metadata'

import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { getApplicationConfig } from './config'

async function bootstrap() {
  const config = getApplicationConfig()
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api/v1')
  app.enableCors({
    origin: config.corsOrigins,
    credentials: true,
  })

  await app.listen(config.port)
  console.log(`HeiMiJJ API is running at http://localhost:${config.port}/api/v1`)
}

void bootstrap()
