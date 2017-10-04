export default date => {
  const now = new Date()
  const minus = now - new Date(date)
  const mdate = new Date(minus)
  const time = {
    '年': mdate.getFullYear() - 1970,
    '个月': mdate.getMonth(),
    '天': mdate.getDate() - 1,
    '个小时': mdate.getHours(),
    '分钟': mdate.getMinutes(),
    '秒': mdate.getSeconds(),
  };
  let key = false
  Object.keys(time).some(v => {
    if (time[v] > 0) {
      key = v
    }
    return time[v] > 0
  })
  return key ? time[key] + `${key}前` : new Date(date).toLocaleDateString()
}
