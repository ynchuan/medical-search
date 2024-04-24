import debug from 'debug'
import fetch from 'node-fetch'
import * as fs from 'fs-extra'
import * as path from 'node:path'

import * as CONST from './const'
import { dataSource } from '../source'

export { fetch, CONST, dataSource }
export const createLog = (space = 'ms') => debug(`MS-${space}`)
export const sleep = time => new Promise(res => setTimeout(() => res(time), time))
export const fetchAll = async ({ api, method = 'POST', data, total, pageSize }) => {
  const count = Math.ceil(total / pageSize)
  const ret = []
  for (let i = 1; i <= count; i++) {
    const ret = await fetch(api, { body: JSON.stringify({ ...data, pageNum: i }), method })
    const res = await ret.json()
    console.log(`整体加载进展：总数${count}，当前是${i}`)
    await sleep(1000)
    ret.push(res)
  }
  return ret
}
export const getWriter = (name = '') => {
  const dirname = path.resolve(process.cwd(), './temp')
  const filename = path.resolve(dirname, name || Date.now() + '.json')
  fs.mkdirpSync(dirname)
  fs.appendFileSync(filename, `${filename}:\n`)
  return msg => {
    fs.appendFileSync(filename, msg)
  }
}
