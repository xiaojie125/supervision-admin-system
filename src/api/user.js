import requests from "@/utils/request";
import md5 from "js-md5";

// 登录
// URL: /user/login POST
export const login = (userInfo) => {
  return requests({
    url: "/user/login",
    method: "post",
    data: {
      account: userInfo.account,
      password: md5(userInfo.password),
    },
  });
};

// 登出
// URL: /common/logout POST
export const logout = () => {
  return requests({
    url: "/common/logout",
    method: "post",
  });
};

// 获取用户信息 通过token来获取
// URL: /user/getInfo GET
export const getInfo = (token) => {
  return requests({
    url: "/common/getUserInfo",
    method: "get",
  });
};


