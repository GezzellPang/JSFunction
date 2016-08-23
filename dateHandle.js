let myDate = new Date()
myDate.getYear()          // 获取当前年份(2位)
myDate.getFullYear()      // 获取完整的年份(4位,1970-????)
myDate.getMonth()         // 获取当前月份(0-11,0代表1月)
myDate.getDate()          // 获取当前日(1-31)
myDate.getDay()           // 获取当前星期X(0-6,0代表星期天)
myDate.getTime()          // 获取当前时间(从1970.1.1开始的毫秒数)
myDate.getHours()         // 获取当前小时数(0-23)
myDate.getMinutes()       // 获取当前分钟数(0-59)
myDate.getSeconds()       // 获取当前秒数(0-59)
myDate.getMilliseconds()    // 获取当前毫秒数(0-999)
myDate.toLocaleDateString()     // 获取当前日期
myDate.toLocaleTimeString()     // 获取当前时间
myDate.toLocaleString()        // 获取日期与时间

export default {

// 日期时间脚本库方法列表

// Date.prototype.isLeapYear 判断闰年
// Date.prototype.Format 日期格式化
// Date.prototype.DateAdd 日期计算
// Date.prototype.DateDiff 比较日期差
// Date.prototype.toString 日期转字符串
// Date.prototype.toArray 日期分割为数组
// Date.prototype.DatePart 取日期的部分信息
// Date.prototype.MaxDayOfDate 取日期所在月的最大天数
// Date.prototype.WeekNumOfYear 判断日期所在年的第几周
// StringToDate 字符串转日期型
// IsValidDate 验证日期有效性
// CheckDateTime 完整日期时间检查
// daysBetween 日期天数差

// ---------------------------------------------------
// 日期格式化
// 格式 YYYY/yyyy/YY/yy 表示年份
// MM/M 月份
// W/w 星期
// dd/DD/d/D 日期
// hh/HH/h/H 时间
// mm/m 分钟
// ss/SS/s/S 秒
// ---------------------------------------------------
  dateFormat (date, formatStr) {
    let str = formatStr
    let Week = ['日', '一', '二', '三', '四', '五', '六']

    str = str.replace(/yyyy|YYYY/, date.getFullYear())
    str = str.replace(/yy|YY/, (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() % 100))

    str = str.replace(/MM/, (1 + date.getMonth()) > 9 ? (1 + date.getMonth()).toString() : '0' + (1 + date.getMonth()))
    str = str.replace(/M/g, date.getMonth())

    str = str.replace(/w|W/g, Week[date.getDay()])

    str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate())
    str = str.replace(/d|D/g, date.getDate())

    str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours())
    str = str.replace(/h|H/g, date.getHours())
    str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes())
    str = str.replace(/m/g, date.getMinutes())

    str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds())
    str = str.replace(/s|S/g, date.getSeconds())

    return str
  },

// ---------------------------------------------------
// | 求两个时间的天数差 日期格式为 YYYY-MM-dd,由于parse函数可以传入-格式日期，所以之前的处理没有必要
// ---------------------------------------------------
  datesBetween (DateOne, DateTwo) {
    // let OneMonth = DateOne.substring(5, DateOne.lastIndexOf('-'))
    // let OneDay = DateOne.substring(DateOne.length, DateOne.lastIndexOf('-') + 1)
    // let OneYear = DateOne.substring(0, DateOne.indexOf('-'))

    // let TwoMonth = DateTwo.substring(5, DateTwo.lastIndexOf('-'))
    // let TwoDay = DateTwo.substring(DateTwo.length, DateTwo.lastIndexOf('-') + 1)
    // let TwoYear = DateTwo.substring(0, DateTwo.indexOf('-'))

    // let cha = (Date.parse(OneMonth + '/' + OneDay + '/' + OneYear) - Date.parse(TwoMonth + '/' + TwoDay + '/' + TwoYear)) / 86400000
    let cha = (Date.parse(DateOne) - Date.parse(DateTwo)) / 86400000
    return Math.abs(cha)
  },

// ---------------------------------------------------
// | 日期计算
// ---------------------------------------------------
  dateAdd (date, strInterval, Number) {
    switch (strInterval) {
      case 's' :return new Date(Date.parse(date) + (1000 * Number))
      case 'n' :return new Date(Date.parse(date) + (60000 * Number))
      case 'h' :return new Date(Date.parse(date) + (3600000 * Number))
      case 'd' :return new Date(Date.parse(date) + (86400000 * Number))
      case 'w' :return new Date(Date.parse(date) + ((86400000 * 7) * Number))
      case 'q' :return new Date(date.getFullYear(), (date.getMonth()) + Number * 3, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())
      case 'm' :return new Date(date.getFullYear(), (date.getMonth()) + Number, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())
      case 'y' :return new Date((date.getFullYear() + Number), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())
    }
  },

// ---------------------------------------------------
// | 比较日期差 dtEnd 格式为日期型或者有效日期格式字符串
// ---------------------------------------------------
  dateDiff (strInterval, dtStart, dtEnd) {
  // 如果是字符串转换为日期型
    if (typeof dtStart === 'string') {
      dtStart = Date.parse(dtStart)
      dtStart = new Date(dtStart)
    }
  // 如果是字符串转换为日期型
    if (typeof dtEnd === 'string') {
      dtEnd = Date.parse(dtEnd)
      dtEnd = new Date(dtEnd)
    }
    switch (strInterval) {
      case 's' :return parseInt((dtEnd - dtStart) / 1000)
      case 'n' :return parseInt((dtEnd - dtStart) / 60000)
      case 'h' :return parseInt((dtEnd - dtStart) / 3600000)
      case 'd' :return parseInt((dtEnd - dtStart) / 86400000)
      case 'w' :return parseInt((dtEnd - dtStart) / (86400000 * 7))
      case 'm' :return (dtEnd.getMonth() + 1) + ((dtEnd.getFullYear() - dtStart.getFullYear()) * 12) - (dtStart.getMonth() + 1)
      case 'y' :return dtEnd.getFullYear() - dtStart.getFullYear()
    }
  },
// ---------------------------------------------------
// | 返回汉字星期
// ---------------------------------------------------
  showWeek (date) {
    let Week = ['日', '一', '二', '三', '四', '五', '六']
    let str = '星期' + Week[date.getDay()]
    return str
  },
// ---------------------------------------------------
// | 把日期分割成数组
// ---------------------------------------------------
  dateToArray (date) {
    let myArray = []
    myArray[0] = date.getFullYear()
    myArray[1] = date.getMonth()
    myArray[2] = date.getDate()
    myArray[3] = date.getHours()
    myArray[4] = date.getMinutes()
    myArray[5] = date.getSeconds()
    return myArray
  },
// ---------------------------------------------------
// | 取得当前日期所在月的最大天数
// ---------------------------------------------------
  maxDayOfDate (date1) {
    let date2 = this.dateAdd(date1, 'm', 1)
    let result = this.datesBetween(this.dateFormat(date1, 'yyyy-MM-dd'), this.dateFormat(date2, 'yyyy-MM-dd'))
    return result
  }
}
