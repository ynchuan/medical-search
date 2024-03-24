import { Controller, Get } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import * as cheerio from 'cheerio'
import { HospitalService } from './hospital.service'
import { Hospital } from './entity/hospital.entity'
import { District } from './entity/district.entity'
import { District2 } from './entity/district2.entity'
import { CONST, fetch, dataSource } from '../../utils'
import { decodeData, encData, signData, keys } from '../../utils/snippet/sm/a'
import rawData from '../../utils/snippet/district/d1'
import rawData2 from '../../utils/snippet/district/d2'

@Controller('hospital')
export class HospitalController {
  constructor(private hospitalService: HospitalService, private readonly httpService: HttpService) { }

  @Get('collectAll')
  collect() {
    return this.hospitalService.collect()
  }

  @Get('district')
  async district() {
    const rep = await dataSource.getRepository(District)
    const data = rawData.reduce((acc, item) => {
      const inst = new District()
      Object.keys(item).forEach(k => (inst[k] = item[k]))
      acc.push(inst)
      return acc
    }, [])
    await rep.save(data)
    return data
  }

  @Get('district2')
  async district2() {
    const handler = input => {
      return input.reduce((acc, item) => {
        const inst = new District2()
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
    const rep = await dataSource.getRepository(District2)
    const data = handler(rawData2)
    await rep.save(data)
    return data
  }

  @Get('collectAClazz')
  async collectAClazz() {
    const rephosp = await dataSource.getRepository(Hospital)
    const res = await fetch(CONST.HOSP_ACLAZZ)
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

  @Get('collectInternet')
  async collectInternet() {
    const rephosp = await dataSource.getRepository(Hospital)
    const res = await fetch(CONST.HOSP_INTERNET)
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

  @Get('collectFirstVisit')
  async collectFirstVisit() {
    const res = await fetch(CONST.HOSP_INTERNET)
    const body = await res.text()
    const $ = cheerio.load(body)
    const ret = $('body > div.main_white > div > div.article_header > h1').text()
    return ret
  }

  @Get('gjyb')
  async gjyb() {
    const raw: any = {
      "addr": "",
      "regnCode": "120000",
      "medinsName": "",
      "pageSize": 100,
      "openElec": "",
      "pageNum": 1,
      "queryDataSource": "es"
    }

    const data: any = {
      appCode: keys.appCode,
      version: keys.version,
      encType: "SM4",
      signType: "SM2",
      timestamp: Date.now(),
      data: raw
    }
    data.signData = signData(data)
    data.data = { encData: encData(data.data) }
    const ret = await fetch(CONST.HOSP_NHSA, {
      body: JSON.stringify(data),
      method: 'POST',
    })
    const text = await ret.json()
    const ddata = decodeData(text)
    return ddata
  }

  @Get('query')
  query() {
    return this.hospitalService.query()
  }

  @Get('queryBuilder')
  queryBuilder() {
    return this.hospitalService.queryBuilder()
  }
}
