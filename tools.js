"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeDate = changeDate;

/**
 * 时间格式
 */
function changeDate(time, format) {
  var t = new Date(time);

  var tf = function tf(i) {
    return (i < 10 ? '0' : '') + i;
  };

  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
    switch (a) {
      case 'yyyy':
        return tf(t.getFullYear());
        break;

      case 'MM':
        return tf(t.getMonth() + 1);
        break;

      case 'mm':
        return tf(t.getMinutes());
        break;

      case 'dd':
        return tf(t.getDate());
        break;

      case 'HH':
        return tf(t.getHours());
        break;

      case 'ss':
        return tf(t.getSeconds());
        break;
    }
  });
}