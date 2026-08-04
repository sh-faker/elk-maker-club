const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  // 静态站不需要把 source map 发到线上：它占了打包产物的一大半，
  // 还会把源码暴露出去。本地调试用 npm run serve 就够了。
  productionSourceMap: false,

  devServer: {
    port: 8081,// 设置端口
    host: 'localhost',
    open: true// 运行后自动打开浏览器
  }

})
