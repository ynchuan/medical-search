import { Module } from '@nestjs/common'
import { DrugController } from './controller/drug'
import { HospitalController } from './controller/hospital'

@Module({
  controllers: [HospitalController, DrugController],
})
export class SniffModule { }
