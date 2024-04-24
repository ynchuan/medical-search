import { Controller, Get, Request } from '@nestjs/common'
import { DataSource } from 'typeorm'
import * as cheerio from 'cheerio'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import { NhasBaseController } from './base'
import { HospitalBj, HospitalNation } from '../entity/hospital'
import { District } from '../entity/district'
import { API, UTILS } from '../../../lib'
import { D as DISTRICT } from '../../../resource'

const { fetch, dataSource, sleep } = UTILS

@Controller('hospital')
export class HospitalController extends NhasBaseController {
  constructor(private readonly httpService: HttpService, private dataSource: DataSource) { super() }

  @Get('collect/nation')
  async hospNation(@Request() req: any) {
    const { debug, start, end, pageSize, code: regnCode, continued } = req.query
    const param = {
      addr: "",
      regnCode: "110000",
      medinsName: "",
      medinsLvCode: "",
      medinsTypeCode: "",
      openElec: "",
      queryDataSource: "es"
    }
    const dist = DISTRICT.default
    if (regnCode && !continued) {
      const { total } = dist.find(item => item.code === regnCode)
      param.regnCode = regnCode
      return this.collect({ param, entity: HospitalNation, ext: { regnCode }, debug, start, end, pageSize, total, api: API.NHSA_QUERYFIXEDHOSPITAL })
    } else {
      const index = regnCode && continued ? dist.findIndex(item => item.code === regnCode) : 0
      for (let i = index; i < dist.length; i++) {
        const { code: regnCode, total } = dist[i]
        param.regnCode = regnCode
        console.log("regnCode", regnCode)
        const st = i === index ? start || 1 : 1
        await this.collect({ param, entity: HospitalNation, ext: { regnCode }, debug, start: st, end, pageSize, total, api: API.NHSA_QUERYFIXEDHOSPITAL })
      }
    }
  }

  @Get('collect/bj')
  async hospBj(): Promise<string> {
    const TOTAL = 4288
    const PAGE_SIZE = 50
    const count = Math.ceil(TOTAL / PAGE_SIZE)
    for (let i = 86; i <= count; i++) {
      const res: any = await firstValueFrom(this.httpService.post(API.BJ_MEDINS_INFO, { admdvs: "", medinsName: "", pageNum: i, pageSize: 50 }))
      console.log(`整体加载进展：总数${count}，当前是${i}`)
      await sleep(1000)
      const { data: { data } } = res?.data
      const rep = await this.dataSource.getRepository(HospitalBj)
      const hosps = data.reduce((acc, item) => {
        const hosp = new HospitalBj()
        Object.keys(item).forEach(k => (hosp[k] = item[k]))
        acc.push(hosp)
        return acc
      }, [])
      await rep.save(hosps)
    }
    return 'This action returns all cats'
  }

  @Get('query/count')
  async queryCount(): Promise<string> {
    return dataSource.query('select count(*) as total from hospital')
  }

  /**
   * https://typeorm.bootcss.com/select-query-builder
   * @returns 
   */
  @Get('query/builder')
  async queryBuilder(): Promise<any> {
    const queryBuilder = dataSource.getRepository(HospitalBj).createQueryBuilder('kfs')
    return queryBuilder.getMany()
  }

  @Get('collect/district')
  async district() {
    const handler = input => {
      return input.reduce((acc, item) => {
        const inst = new District()
        inst.code = item.code
        inst.parent = item.prntCode
        inst.name = item.name
        inst.level = item.admdvsLv
        acc.push(inst)
        if (item.list && item.list.length > 0) {
          const temp = handler(item.list)
          acc.push(...temp)
        }
        return acc
      }, [])
    }
    const rep = await dataSource.getRepository(District)
    const data = handler(DISTRICT)
    await rep.save(data)
    return data
  }

  @Get('collect/aclazz')
  async aclazz() {
    const rephosp = await dataSource.getRepository(HospitalBj)
    const res = await fetch(API.HOSP_ACLAZZ)
    const body = await res.text()
    const $ = cheerio.load(body)
    const where = Array.from($('body > div.main_white > div > div.article > div > div > table > tbody > tr:not(.firstRow)')).reduce((acc, item) => {
      const id = $(item).find('td:nth-child(2)').text()
      acc.push({ code: id })
      return acc
    }, [])
    const values = await rephosp.find({ where })
    values.forEach(item => { item.isAclazz = true })
    await rephosp.save(values)
    return values
  }

  @Get('collect/internet')
  async internet() {
    const rephosp = await dataSource.getRepository(HospitalBj)
    const res = await fetch(API.HOSP_INTERNET)
    const body = await res.text()
    const $ = cheerio.load(body)
    const where = Array.from($('body > div.main_white > div > div.article > div > div.ue_table > table > tbody > tr:not(.firstRow)')).reduce((acc, item) => {
      const id = $(item).find('td:nth-child(3)').text()
      acc.push({ code: id })
      return acc
    }, [])
    const values = await rephosp.find({ where })
    values.forEach(item => { item.isInternet = true })
    await rephosp.save(values)
    return values
  }

  @Get('collect/firstvisit')
  async firstVisit() {
    const res = await fetch(API.HOSP_INTERNET)
    const body = await res.text()
    const $ = cheerio.load(body)
    return $('body > div.main_white > div > div.article_header > h1').text()
  }

}
