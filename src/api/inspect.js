/*
 * @描述信息: XXX模块接口
 * @Author:  XXX
 */

import { get, getFile, getFile2, post, put } from '@utils/http.js'

// XXX
const taskStr = '/inspection/united/patrol/strategy'
export const strategyList = obj => post(`${taskStr}/list`, obj) // 根据条件分页查询巡视方案
