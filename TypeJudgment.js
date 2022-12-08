class TypeJudgment {
  // 基础类型

  /**
   * @param {*} val
   * @returns {Boolean} 是否为数字
   */
  static isNumber(val) {
    return typeof val === 'number'
  }

  /**
   * @param {*} val
   * @returns {Boolean} 是否为字符串
   */
  static isString(val) {
    return typeof val === 'string'
  }

  /**
   * @param {*} obj
   * @returns {Boolean} 是否是布尔值
   */
  static isBoolean(obj) {
    return typeof obj === 'boolean'
  }

  /**
   * @param {*} arr
   * @returns {Boolean} 是否为数组
   */
  static isArray(arr) {
    return arr instanceof Array
  }

  /**
   * @param {*} val
   * @returns {Boolean} 是否为对象
   */
  static isObject(val) {
    return val !== null && typeof val === 'object'
  }

  /**
   * @param {*} val
   * @returns {Boolean} 是否为Function
   */
  static isFunction(val) {
    return toString.call(val) === '[object Function]'
  }

  /**
   * @param {*} obj
   * @returns {Boolean} 是否为NULL
   */
  static isNull(obj) {
    return obj === undefined || obj === null
  }

  /**
   * @param {*} val
   * @returns {Boolean} 是否为undefined
   */
  static isUndefined(val) {
    return typeof val === 'undefined'
  }

  /**
   * @param {Object} obj
   * @returns {Boolean} 是否为空对象
   */
  static isEmptyObj(obj) {
    if (!this.isObject(obj)) return true

    for (let obj1 in obj) {
      return false
    }

    return true
  }

  /**
   * @param {Number} obj
   * @returns {Boolean} 是否为整数
   */
  static isInteger(obj) {
    if (!this.isNumber(obj)) return console.error('isInteger 方法需要数值类型')

    return (obj | 0) === obj
  }

  /**
   * @param {*} obj
   * @returns {Boolean} 是否为空值
   */
  static isNoValue(obj) {
    return obj === undefined || obj === null || obj === ''
  }

  // 业务相关

  /**
   * @returns 是否为PC端环境
   */
  static isPc() {
    return !/Android|iPhone|SymbianOS|Windows Phone|iPad|iPod/.test(navigator.userAgent)
  }

  /**
   * @param {String} contact
   * @returns {Boolean} 是否为联系方式
   */
  static isContact(contact) {
    return this.isPhone(contact) || this.isTel(contact)
  }

  /**
   * @param {String} phone
   * @returns {Boolean} 是否为手机号码
   */
  static isPhone(phone) {
    return /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(phone)
  }

  /**
   * @param {String} tel
   * @returns {Boolean} 是否为固话
   */
  static isTel(tel) {
    // eslint-disable-next-line no-useless-escape
    return /^(0\d{2,3}\-)?([2-9]\d{6,7})+(\-\d{1,6})?$/.test(tel)
  }

  /**
   * @param {*} data
   * @returns {Promise<Boolean>} 是否为Blob对象
   */
  static async isBlob(data) {
    try {
      const text = await data.text()
      JSON.parse(text)
      return false
    } catch (error) {
      return true
    }
  }

  /**
   * @param {String} email
   * @returns {Boolean} 是否为email
   */
  static isEmail(email) {
    return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)
  }
}

export default TypeJudgment
