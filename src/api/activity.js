// 关于动态的接口
import requests from "@/utils/request";

// 发布新动态
// URL:/activity/addActivity POST
export const addActivity = (activity) => {
  return requests({
    url: "/activity/addActivity",
    method: "POST",
    data: activity,
  });
};

// 获取动态
// URL:/activity/getActivity GET
export const getActivity = (activity) => {
  return requests({
    url: "/activity/getActivity",
    method: "GET",
  });
};
