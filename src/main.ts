import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { dataSource } from './lib/utils'
import 'module-alias/register'

async function bootstrap() {
  await dataSource.initialize()
  const app = await NestFactory.create(AppModule)
  await app.listen(80)
}
bootstrap()
