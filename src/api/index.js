import request from "@/utils/request";
import md5 from "js-md5"

export const login = (userInfo) => {
  // 首先对密码进行加密 使用md5加密
  // md5是单向加密 当密码被篡改 也可以使用md5算法进行验证
  userInfo.password = md5(userInfo.password)
  // 发送请求进行登录
  console.log(userInfo)
}