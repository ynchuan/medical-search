import { UTILS } from '../../../lib'
import { A } from '../../../resource'

const { decodeData, encData, signData, keys } = A
const { fetch, dataSource, sleep, createLog, getWriter } = UTILS
const log = createLog('NhasBaseController')
const writer = getWriter('base.txt')

/**
 * 基类 - 国家医保平台服务
 */
export class NhasBaseController {

  async collect(config) {
    const { entity: Entity, total, api, param = {}, ext, debug = false, start = 1, pageSize = 1000, end } = config
    const rep = await dataSource.getRepository(Entity)
    const count = Math.ceil(total / pageSize)
    let res
    for (let i = start; i <= count; i++) {
      console.time(`time ${i}`)
      if (end && i >= end) return `finished ${i} `
      try {
        const rawParam = { ...param, pageNum: i, pageSize }
        const data: any = {
          appCode: keys.appCode,
          version: keys.version,
          encType: "SM4",
          signType: "SM2",
          timestamp: Date.now(),
          data: rawParam
        }
        data.signData = signData(data)
        data.data = { encData: encData(data.data) }
        log(`下载开始：当前是${i}，总数${count}`)
        const fp = await fetch(api, { body: JSON.stringify({ ...data }), method: 'POST' })
        res = await fp.json()
        const ddres = decodeData(res)
        if (debug) {
          return ddres
        } else {
          const drugs = ddres?.list.reduce((acc, item) => {
            const ent = new Entity()
            item.addr = item.addr || ''
            Object.keys(item).forEach(k => (ent[k] = item[k]))
            ext && Object.keys(ext).forEach(k => (ent[k] = ext[k]))
            acc.push(ent)
            return acc
          }, [])
          // for (const data of drugs) {
          //   try {
          //     await rep.save(data)
          //   } catch (error) {
          //     console.error(error)
          //     writer(`下载保存单个失败：${api} ${i} ${error.message} ${ext.regnCode}\n`)
          //     continue
          //   }
          // }
          await rep.save(drugs)
          writer(`下载保存完成：${api} ${i} ${ext.regnCode} \n`)
        }
      } catch (e) {
        log(`下载异常${e.message}，当前是${i}，总数${count}`)
        writer(`下载保存失败：${api} ${i} ${e.message} ${ext.regnCode}\n`)
      }
      await sleep(1000)
      console.timeEnd(`time ${i}`)
    }
    return 'succ'
  }
}
