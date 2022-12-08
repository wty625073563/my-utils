import TY from './TypeJudgment'

class Color {
  /**
   * 16进制色值获取反色设置方法
   * @param  {String} oldColor 为16进制色值的字符串（例：'#000000'）
   * @return {String} 返回反色的色值（例：'#ffffff'）
   */
  static colorReverse(color) {
    color = '0x' + color.replace(/#/g, '')
    let str = '000000' + (0xffffff - color).toString(16)
    return '#' + str.substring(str.length - 6, str.length)
  }

  /**
   * rgb 转 16进制
   * @param {String|Array<Number>} rgb  rgb('1, 2, 3') | [1, 2, 3]
   * @returns
   */
  static rgb2hex(rgb) {
    let colorArr
    if (TY.isString(rgb) && /rgb|RGB/.test(rgb)) {
      colorArr = rgb.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',')
    } else if (TY.isArray(rgb)) {
      colorArr = rgb
    }

    if (!colorArr) return rgb

    let strHex = '#'
    // 转成16进制
    for (let i = 0; i < colorArr.length; i++) {
      let hex = Number(colorArr[i]).toString(16)
      if (hex === '0') {
        hex += hex
      }
      strHex += hex
    }
    return strHex
  }
}

export default Color
