const webpack = require('webpack');
// const path = require('path')

// function resolve(dir) {
//   return path.join(__dirname, '..'1, dir)
// }

module.exports = {
  lintOnSave: false,
  publicPath: './', // 部署项目路径
  // baseUrl: process.env_NODE_ENV == 'production' ? '/vehiclerepair/' : '', // 部署项目路径
  devServer: {
    port: 8080, // 端口号
    // host: '10.1.',
    open: true, // 配置自动启动浏览器
    proxy: {
      '/sq': {
        // target: 'http://10.1.30.210:50081/sq',
        target: 'http://10.1.4.50:8080/sq',
        // target: '/sq',
        // target: 'http://172.20.50.115:8080/sq',
        // target: 'http://192.168.1.115:8080/vehiclerepair',
        // target: 'http://10.1.30.207:50045/vehiclerepair',
        // target: 'http://10.1.30.178:8080/vehiclerepair',
        // target: 'http://10.1.30.103:8080/vehiclerepair',
        changeOrigin: true,
        pathRewrite: {
          '^/sq': '/'
        }
      }
    }
  },

  configureWebpack: {
    // webpack 配置项
    // resolve: {
    //   alias: {
    //     vue$: 'vue/dist/vue.esm.js'
    //     // '@': resolve('src'),
    //     // 'views': resolve('src/views')
    //   }
    // },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery'
      })
    ]
  }
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       data: `@import "@/assets/css/global.scss";`
  //     }
  //   }
  // }
};
