import debug from 'debug'
import fetch from 'node-fetch'
import * as CONST from './const'
import { dataSource } from '../source'

export { fetch, CONST, dataSource }
export const createLog = (space = 'ms') => debug(space)
export const sleep = time => new Promise(res => setTimeout(() => res(time), time))