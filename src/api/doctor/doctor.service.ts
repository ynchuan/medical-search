import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'

@Injectable()
export class DoctorService {
  constructor(private readonly httpService: HttpService) { }

  intro() {
    console.log('DoctorService httpService', this.httpService)
    return ' i am doctor'
  }
}
