import { Controller, Get, Request } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { HttpService } from '@nestjs/axios'
import { NhasBaseController } from './base'
import { DrugCg, DrugZcy, DrugZzy } from '../entity/drug'
import { DRG } from '../../../resource'

/**
 * 药品采集
 */
@Controller('drug')
export class DrugController extends NhasBaseController {
  constructor(private readonly httpService: HttpService, private dataSource: DataSource) {
    super()
  }

  @Get('collect/xy')
  async xy(@Request() req: any) {
    const { debug, start, end, pageSize } = req.query
    return this.collect({ ...DRG.DRUGS.XY, entity: DrugCg, ext: { drugCategory: 'X' }, debug, start, end, pageSize })
  }

  @Get('collect/zcey')
  async zcey(@Request() req: any) {
    const { debug, start, end, pageSize } = req.query
    return this.collect({ ...DRG.DRUGS.ZCEY, entity: DrugCg, ext: { drugCategory: 'Z' }, debug, start, end, pageSize })
  }

  @Get('collect/zcy')
  async zcy(@Request() req: any) {
    const { debug, start, end, pageSize } = req.query
    return this.collect({ ...DRG.DRUGS.ZCY, entity: DrugZcy, debug, start, end, pageSize })
  }

  @Get('collect/zzy')
  async zzy(@Request() req: any) {
    const { debug, start, end, pageSize } = req.query
    return this.collect({ ...DRG.DRUGS.ZZY, entity: DrugZzy, debug, start, end, pageSize })
  }

}
