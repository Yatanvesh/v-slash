import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()
  const port = process.env.PORT || 3333

  await app.listen(port)
  Logger.log(
    `V-slash Application is running on: http://localhost:${port}/${globalPrefix}`,
  )
}
bootstrap()
