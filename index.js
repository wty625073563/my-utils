import TypeJudgment from './TypeJudgment'

import loadshEq from 'lodash.eq'
import loadshDebounce from 'lodash.debounce'
import loadshThrottle from 'lodash.throttle'
import loadshCloneDeep from 'lodash.clonedeep'

/**
 * 类型判断集合
 */
export const TY = TypeJudgment

/**
 * @param {*} value 要比较的值
 * @param {*} other 另一个要比较的值
 * @doc https://www.lodashjs.com/docs/lodash.eq#_eqvalue-other
 * @returns {Boolean} 比较两者的值，来确定它们是否相等
 */
export const eq = (value, other) => loadshEq(value, other)

/**
 * @param {Date|Number|String} time 时间
 * @param {String} pattern 格式化配置
 * @returns {String}
 */
export function parseTime(time, pattern) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    } else if (typeof time === 'string') {
      time = time
        .replace(new RegExp(/-/gm), '/')
        .replace('T', ' ')
        .replace(new RegExp(/\.[\d]{3}/gm), '')
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

/**
 * @description 格式化时间值，常用于消息列表
 * @param {Number} time 时间戳
 * @param {String} option
 * @returns {String}
 */
export const formatTime = (time, option) => {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  }
  return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
}

/**
 * @desc 密码检测
 * @param {String} pw 新密码
 * @param {String} oldPw 旧密码
 * @returns {Object}
 */
export const checkPasswordStrength = (pw, oldPw) => {
  let result = {
    strength: 0,
    tooShort: false,
    invalid: false,
    samePassword: false,
    tooShortText: '密码长度需大于等于6位',
    invalidText: '密码只能由字母、数字、下划线和减号组成',
    samePasswordText: '与原密码相同'
  }
  if (oldPw && pw === oldPw) {
    result.samePassword = true
    return result
  }
  if (pw.length < 6) {
    result.tooShort = true
    return result
  }
  if (!/^[a-zA-Z0-9_-]+$/.test(pw)) {
    result.invalid = true
    return result
  }
  if (/[0-9]/.test(pw)) result.strength++ // 数字
  if (/[a-z]/.test(pw)) result.strength++ // 小写
  if (/[A-Z]/.test(pw)) result.strength++ // 大写
  if (/_|-/.test(pw)) result.strength++ // 下划线和减号
  return result
}

/**
 * @desc 深拷贝
 * @param {*} obj
 * @returns {*}
 */
export const deepClone = (obj) => loadshCloneDeep(obj)

/**
 * @desc 函数防抖
 * @param func 目标函数
 * @param wait 延迟执行毫秒数
 * @doc https://lodash.com/docs/4.17.15#debounce
 */
export const debounce = (func, wait, options) => loadshDebounce(func, wait, options)

/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @doc https://lodash.com/docs/4.17.15#debounce
 */
export const throttle = (func, wait, options) => loadshThrottle(func, wait, options)

/**
 * @desc 首字母大小
 * @param {String} str
 * @returns {String}
 */
export const titleCase = (str) => str.replace(/( |^)[a-z]/g, (L) => L.toUpperCase())

/**
 * @desc 下划转驼峰
 * @param {String} str
 * @returns {String}
 */
export const camelCase = (str) => str.replace(/_[a-z]/g, (str1) => str1.substr(-1).toUpperCase())

/**
 * @desc 根据路径下载文件
 * @param {String} url
 */
export function downLoadUrl(url) {
  let dom = document.createElement('a')
  dom.href = url
  dom.click()
  dom = null
}

/**
 * @desc base64转成File对象
 * @param {String} base64 文件的base64
 * @param {String} filename 文件名
 * @returns {File}
 */
export function base64toFile(base64, filename = 'file') {
  let arr = base64.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let suffix = mime.split('/')[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], `${filename}.${suffix}`, { type: mime })
}

/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    let part = encodeURIComponent(propName) + '='
    if (value !== null && typeof value !== 'undefined') {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && typeof value[key] !== 'undefined') {
            let params = propName + '[' + key + ']'
            let subPart = encodeURIComponent(params) + '='
            result += subPart + encodeURIComponent(value[key]) + '&'
          }
        }
      } else {
        result += part + encodeURIComponent(value) + '&'
      }
    }
  }
  return result
}

/**
 * 获取参数
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url === void 0 ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * 文件大小 字节转换单位
 * @param size
 * @returns {string|*}
 */
export const filterSize = (size) => {
  if (!size) return ''
  if (size < pow1024(1)) return size + ' B'
  if (size < pow1024(2)) return (size / pow1024(1)).toFixed(2) + ' KB'
  if (size < pow1024(3)) return (size / pow1024(2)).toFixed(2) + ' MB'
  if (size < pow1024(4)) return (size / pow1024(3)).toFixed(2) + ' GB'
  return (size / pow1024(4)).toFixed(2) + ' TB'
}

// 求次幂
export function pow1024(num) {
  return Math.pow(1024, num)
}

/**
 * 获取OBS文件连接的名称
 * @param {String} url
 * @returns {String} name
 */
export function getFileName(url) {
  const hasFileName = url.split('?fileName=')
  return hasFileName[1] ? hasFileName[1] : ''
}
