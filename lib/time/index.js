const week = [
  "/u65e5",
  "/u4e00",
  "/u4e8c",
  "/u4e09",
  "/u56db",
  "/u4e94",
  "/u516d"
]; // 一、二、三、四、五、六、七
const weekPrefix = {
  "1": "/u5468", //周
  "2": "/u661f/u671f" //星期
};
/**
 * 进行日期格式的转换
 * @param date
 * @param format
 * @returns {void|string|XML|*}
 */
const formatDate = (exports.formatDate = function(date, formatStr) {
  let map = {
    M: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
    q: Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  };

  formatStr = formatStr.replace(/([yMdhmsqSW])+/g, function(all, t) {
    let v = map[t];
    if (v !== undefined) {
      if (all.length > 1) {
        v = "0" + v;
        v = v.substr(v.length - 2);
      }
      return v;
    } else if (t === "y") {
      let i = 4 - all.length;
      return i <= 0
        ? date.getFullYear() + ""
        : (date.getFullYear() + "").substr(i);
    } else if (t === "W") {
      return (weekPrefix[all.length + ""] || "") + week[date.getDay()];
    }
    return all;
  });

  return formatStr;
});

/**
 * 将时间字符串按照指定格式进行转换
 * @param  {String} date   时间字符串
 * @param  {String} formatStr 转换的格式
 * @return {String}        转换后的时间字符串
 */
exports.longToDate = function(date, formatStr) {
  date = date + "";
  date =
    [date.substr(0, 4), date.substr(4, 2), date.substr(6, 2)].join("-") +
    " " +
    [date.substr(8, 2), date.substr(10, 2)].join(":");
  return formatDate(new Date(date), formatStr);
};

/**
 * 将时间字符串转换成14位的数字
 * @param date
 * @returns {string}
 */
exports.dateToLong = function(date) {
  let arr = [];
  arr.push(date.getFullYear());
  arr.push("0" + (date.getMonth() + 1));
  arr.push("0" + date.getDate());
  arr.push("0" + date.getHours());
  arr.push("0" + date.getMinutes());
  arr.push("0" + date.getSeconds());
  for (let i = 1, l = arr.length; i < l; i++) {
    arr[i] = arr[i].substr(arr[i].length - 2);
  }
  return parseInt(arr.join(""), 10);
};
