const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    proxy: {
      '/api': { // 匹配所有以 '/api'开头的请求路径
        target: 'http://127.0.0.1:8000', // 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        } // 代理到服务器的时候，去除api路径
      },
    }
  }
})
