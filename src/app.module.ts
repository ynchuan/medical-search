import { Module } from '@nestjs/common'
import { HospitalModule } from './api/hospital/hospital.module'
import { DoctorModule } from './api/doctor/doctor.module'
import { CommonModule } from './utils/common.module'

@Module({
  imports: [
    CommonModule,
    HospitalModule,
    DoctorModule,
  ],
})
export class AppModule { }
