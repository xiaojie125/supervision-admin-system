import requests from "@/utils/request";

// 获取用户信息 通过token来获取
// URL: /user/userInfo GET
export const getInfo = () => {
  return requests({
    url: "/my/userInfo",
    method: "get",
  });
};

// 更新用户信息 通过token来获取
// URL: /user/userInfo GET
export const updateInfo = (userInfo) => {
  return requests({
    url: "/my/userInfo",
    method: "post",
    data: userInfo,
  });
};

// 获取用户签到信息 通过userId来获取
// URL: /my/signInInfo GET
export const getSignInInfo = (userId) => {
  return requests({
    url: "/my/signInInfo",
    method: "get",
    params: {
      userId,
    },
  });
};

// 用户签到 通过userId来签到
// URL: /my/signIn POST
export const signInHandler = (userId) => {
  return requests({
    url: "/my/signIn",
    method: "post",
    data: {
      userId,
    },
  });
};

// 获取用户任务列表
// URL: /my/taskList GET
export const getTaskList = (userId) => {
  return requests({
    url: "/my/taskList",
    method: "get",
    params: {
      userId,
    },
  });
};
