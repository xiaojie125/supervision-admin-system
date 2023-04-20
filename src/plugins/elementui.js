import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI,{ Table } from 'element-ui'

// 解决 ElTable 自动宽度高度导致的「ResizeObserver loop limit exceeded」问题
const fixElTableErr = table => {
  const oldResizeListener = table.methods.resizeListener
  table.methods.resizeListener = function () {
    window.requestAnimationFrame(oldResizeListener.bind(this))
  }
}

// 一定要在Vue.use之前执行此函数
fixElTableErr(Table)

Vue.use(ElementUI);