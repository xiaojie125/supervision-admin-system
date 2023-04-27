import Vue from "vue";
import { Message } from "element-ui";
/**
 * 封装处理await错误的方法
 */
export const awaitWrap = (promise) => {
  // 处理请求结果
  return (
    promise
      // 当请求成功的时候
      .then((res) => {
        // 判断请求结果是否是正确的结果
        if (!res.success) {
          Message({
            message: res.message || res.data,
            type: "warning",
          });
        } else {
          return res;
        }
      })
      // 请求失败了
      .catch((err) => {
        Message({
          message: err.message,
          type: "warning",
        });
      })
  );
};

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function (...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}

/**
 * 格式化数据
 * [{a:1]} => [{a:1,orignalData:{a:1},edit:false}]
 */

export const formatTime = (time) => {
  const toFullDate = (date) => (date > 10 ? date : `0${date}`);

  const date = new Date(time);
  const year = date.getFullYear();
  const month = toFullDate(date.getMonth() + 1);
  const day = toFullDate(date.getDate());
  return `${year}-${month}-${day}`;
};

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += " " + cls;
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    ele.className = ele.className.replace(reg, " ");
  }
}
