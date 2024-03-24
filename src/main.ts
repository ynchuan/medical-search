import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { dataSource } from './utils'
import 'module-alias/register'

async function bootstrap() {
  await dataSource.initialize()
  const app = await NestFactory.create(AppModule)
  await app.listen(3000)
}
bootstrap()
