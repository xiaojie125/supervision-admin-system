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
    redirect:"/home",
    children: [{
      path:"/home",
      component:() => import("@/views/profile")
    }],
  },

  {
    path: "/task",
    name: "task",
    component: Layout,
    redirect: "noRedirect",
    children: [
      {
        path: "add",
        name: "addTask",
        meta: {
          keepAlive: true,
          title: "发布任务",
        },
        component: () => import("@/views/task/add"),
      },
      {
        path: "edit",
        name: "editTask",
        meta: {
          keepAlive: false,
          title: "任务管理",
        },
        component: () => import("@/views/task/edit"),
      },
      {
        path: "history",
        name: "historyTask",
        meta: {
          keepAlive: false,
          title: "历史任务",
        },
        component: () => import("@/views/task/history"),
      },
    ],
  },

  {
    path: "/contact",
    name: "contact",
    component: Layout,
    redirect: "index",
    children: [
      {
        path: "index",
        name: "contactList",
        meta: {
          keepAlive: false,
          title: "联系人列表",
        },
        component: () => import("@/views/contact"),
      },
    ],
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];


const createRouter = () => new VueRouter({
  // mode: 'history', // 需要后端支持
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  // 重新设置路由
  router.matcher = newRouter.matcher
}

export default router;
