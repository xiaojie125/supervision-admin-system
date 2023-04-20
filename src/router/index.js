import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
import Layout from "@/layout";

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push;
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    name: "home",
    component: Layout,
    children: [
      {
        path: "/task/add",
        name: "task",
        meta: {
          keepAlive: true,
          title: "发布任务",
        },
        component: () => import("@/views/task/add"),
      },
      {
        path: "/task/edit",
        name: "task",
        meta: {
          keepAlive: false,
          title: "任务管理",
        },
        component: () => import("@/views/task/edit"),
      },
      {
        path: "/task/history",
        name: "task",
        meta: {
          keepAlive: false,
          title: "历史任务",
        },
        component: () => import("@/views/task/history"),
      },
    ],
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const router = new VueRouter({
  routes,
});

export default router;
