import router from './router'
import store from './store'
import { Message } from 'element-ui'
// 引入进度条
import NProgress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
// 获取token
import { getToken } from '@/utils/auth'
// import getPageTitle from '@/utils/get-page-title'

// 进度条的配置
NProgress.configure({ showSpinner: false }) 

// 设置不重定向的路径
const whiteList = ['/login']

router.beforeEach(async(to, from, next) => {
  // // 临时处理
  // next()
  // return
  // 进度条开始
  NProgress.start()

  // 设置页面的标题
  // document.title = getPageTitle(to.meta.title)

  // 判断用户是否登录了
  const hasToken = getToken()

  if (hasToken) {
    // 有token 则判断
    if (to.path === '/login') {
      // 如果已经登录了 则重定向到 /
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.username
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // 获取用户的信息
          await store.dispatch('user/getInfo')

          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
