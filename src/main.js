import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

// 引入elementui的模块
import '@/plugins/elementui'

// 引入权限管理
import "@/permission"

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate(){
    Vue.prototype.$bus = this
  }
}).$mount('#app')