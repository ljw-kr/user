export function formatDate (time) {
  let date = new Date(time)
  var year = date.getFullYear()
  let month = date.getMonth() + 1// 月份是从0开始的
  let day = date.getDate()
  let hour = date.getHours()
  let min = date.getMinutes()
  let sec = date.getSeconds()
  let newTime = year + '-' +
    (month < 10 ? '0' + month : month) + '-' +
    (day < 10 ? '0' + day : day) + ' ' +
    (hour < 10 ? '0' + hour : hour) + ':' +
    (min < 10 ? '0' + min : min) + ':' +
    (sec < 10 ? '0' + sec : sec)
  return newTime
}
export function formatDate2 (time, format = 'YY-MM-DD hh:mm:ss') {
  var date = new Date(time)

  let year = date.getFullYear()
  let month = date.getMonth() + 1 // 月份是从0开始的
  let day = date.getDate()
  let hour = date.getHours()
  let min = date.getMinutes()
  let sec = date.getSeconds()
  var preArr = Array.apply(null, Array(10)).map(function (elem, index) {
    return '0' + index
  })/// /开个长度为10的数组 格式为 00 01 02 03

  var newTime = format.replace(/YY/g, year)
    .replace(/MM/g, preArr[month] || month)
    .replace(/DD/g, preArr[day] || day)
    .replace(/hh/g, preArr[hour] || hour)
    .replace(/mm/g, preArr[min] || min)
    .replace(/ss/g, preArr[sec] || sec)

  return newTime
}
// formatDate(new Date().getTime())// 2017-05-12 10:05:44
// formatDate(new Date().getTime(), 'YY年MM月DD日')// 2017年05月12日
// formatDate(new Date().getTime(), '今天是YY/MM/DD hh:mm:ss')// 今天是2017/05/12 10:07:45
