import { Module, Global } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { TypeOrmModule } from '@nestjs/typeorm'
import { config } from '../source/config'

@Global()
@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forRoot(config)
  ],
  exports: [HttpModule],
})
export class CommonModule { }
