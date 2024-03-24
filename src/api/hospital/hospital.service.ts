import { Injectable, } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { DataSource } from 'typeorm'
import { firstValueFrom } from 'rxjs'
import { Hospital } from './entity/hospital.entity'
import { sleep, createLog } from '../../utils'
import { dataSource } from '../../source'

const TOTAL = 4288
const PAGE_SIZE = 50
const API = 'https://fw.ybj.beijing.gov.cn/hsa-local-prd/api/hsa-pss-pw/web/pw/base/queryFixedMedinsInfo'
const log = createLog('HospitalService')

@Injectable()
export class HospitalService {
  constructor(private httpService: HttpService, private dataSource: DataSource) { }

  async collect(): Promise<string> {
    const count = Math.ceil(TOTAL / PAGE_SIZE)
    for (let i = 86; i <= count; i++) {
      const res: any = await firstValueFrom(this.httpService.post(API, { admdvs: "", medinsName: "", pageNum: i, pageSize: 50 }))
      console.log(`整体加载进展：总数${count}，当前是${i}`)
      await sleep(1000)
      const { data: { data } } = res?.data
      const rep = await this.dataSource.getRepository(Hospital)
      const hosps = data.reduce((acc, item) => {
        const hosp = new Hospital()
        Object.keys(item).forEach(k => (hosp[k] = item[k]))
        acc.push(hosp)
        return acc
      }, [])
      await rep.save(hosps)
    }
    return 'This action returns all cats'
  }

  async query(): Promise<string> {
    const rep = await dataSource.query('select count(*) as total from hospital')
    log(rep)
    return rep
  }

  async queryBuilder(): Promise<any> {
    // https://typeorm.bootcss.com/select-query-builder
    const queryBuilder = dataSource.getRepository(Hospital).createQueryBuilder('kfs')
    const values = await queryBuilder.getMany()
    return values
  }
}