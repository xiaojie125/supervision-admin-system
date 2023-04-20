import requests from "@/utils/request";

// 通过token来保持持久化登录
// URL:/my/getBasicInfo GET
export const getUserBasicInfoByToken = () => {
  return requests({
    url: "/common/userBasicInfo",
    method: "get",
  });
};

// 上传图片
// URL:/common/uploadPhoto POST
export const uploadPhoto = (file) => {
  return uploadFile({
    url: "/common/uploadPhoto",
    data: {
      file,
    },
    method: "post",
  });
};

// 获取员工列表
// URL:/common/getStaff GET
export const reqStaffList = () => {
  return requests({
    url: "/common/getStaff",
    method: "get",
  });
};
