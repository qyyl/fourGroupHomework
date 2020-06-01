import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'
import less from 'less'
import initRichText from './common/initHTMLEditor.js'
import 'font-awesome/css/font-awesome.min.css'
//   引入echart插件
import echarts from 'echarts'
Axios.defaults.baseURL = 'http://106.12.22.92:8080'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.prototype.$axios = Axios
Vue.use(ElementUI)
Vue.use(less)
Vue.use(initRichText)
new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')
