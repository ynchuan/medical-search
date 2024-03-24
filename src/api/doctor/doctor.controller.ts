import { Controller, Get } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { DoctorService } from './doctor.service'

@Controller('doctor')
export class DoctorController {
  constructor(private doctorService: DoctorService, private readonly httpService: HttpService) { }

  @Get('collect')
  collect(): string {
    console.log('DoctorController httpService', this.httpService)
    return this.doctorService.intro()
  }

}
