import { Module } from '@nestjs/common'
// import { HospitalModule } from './api/hospital/hospital.module'
// import { DoctorModule } from './api/doctor/doctor.module'
import { SniffModule } from './api/sniff/module'
import { CommonModule } from './lib/common.module'

@Module({
  imports: [
    CommonModule,
    SniffModule
    // HospitalModule,
    // DoctorModule,
  ],
})
export class AppModule { }
