import Vue from "vue";
import App from "./App.vue";
import router from "./router.js";
import Axios from "axios";
import Element from 'element-ui'
import store from './store/index.js'
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'
import Vuex from "vuex"
import VideoPlayer from 'vue-video-player'
import * as http from './api/request.js'
import moment from 'moment'
import $ from 'jquery'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)
Vue.use(Vuex)
Vue.prototype.$echarts = echarts
//全局过滤器  时间过滤
Vue.filter("dateFmt", (input, formatString = "YYYY-MM-DD") => {
  //es5函数参数设置默认值
  //const lastFormatString = formatString || 

  
   // moment(input) 把时间字符串转成时间对象
   // format(formatString) 把时间对象，按照指定格式，格式化成符合条件的字符串
  return moment(input).format(formatString)
})

Vue.prototype.$axios = http.Axios
Vue.prototype.$fetchGet = http.fetchGet
Vue.prototype.$fetchPost = http.fetchPost
Vue.prototype.$fetchPut = http.fetchPut
Vue.prototype.$fetchDelete = http.fetchDelete


import 'swiper/dist/css/swiper.css'
// Vue.prototype.IP = "http://10.1.4.50:8080/sq"
//Vue.prototype.IP = "http://172.20.50.115:8080/sq"
// Vue.prototype.IP = "http://10.1.30.210:50081/sq"
// Vue.prototype.IP = "http://10.1.4.124:8099/sq"
//Vue.prototype.IP = "/sq"
Vue.use(Element)
Axios.create({
  timeout: 50000,
  withCredentials: true // 是否允许带cookie这些
})
Vue.prototype.$axios = Axios;
// console.log(Vue.prototype.$axios.create())
Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
  next();
});
router.afterEach(() => {});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
