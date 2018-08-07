/**
 * @file: 用于存放工具类
 */

class URLWrapper {
  /**
   * 构造URL装饰器
   * @param {String} url 初始的url字符串，url字符串允许存在占位符
   *    Example: url = new URLWrapper('http://a.com/{foo}')，则可以使用url.replace({ foo: 'bar' })来进行替换，
   *    替换后为: http://a.com/bar
   * @param {Object} querys 要查询的字段
   */
  constructor (url, querys) {
    this.template = url // 模板
    this.url = url
    this.query(querys)
  }

  /**
   * 将查询的字段封装进URL
   * @param {Object} payload 待查询字段
   */
  query (payload={}) {
    if (Object.keys(payload).length === 0) return this.url

    const payloads = Object.keys(payload).map(k => `${k}=${payload[k]}`).join('&')
    this.url += (this.url.indexOf('?') === -1 ? '?' : '&') + payloads
    console.log(this.url)
    return this.url
  }

  /**
   * 将URL中的可替换字段替换为对应的值
   * @param {Object} payload 待替换字段
   */
  replace (payload={}) {
    for (let k in payload) {
      this.url = this.template.replace(`{${k}}`, payload[k])
    }
    return this.url
  }
}

export {
  URLWrapper
}