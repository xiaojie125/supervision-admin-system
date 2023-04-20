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
 * 格式化数据
 * [{a:1]} => [{a:1,orignalData:{a:1},edit:false}]
 */

export const formatData = (array) => {
  return array.map((item) => {
    // 然后给bigPileData添加属性edit
    item.originalData = { ...item };
    Vue.prototype.$set(item, "edit", false);
    return item;
  });
};
