import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/router/permission'

import '@assets/style/main.scss' // 引入基础scss文件
import '@svg' // 引入svg

// 全局引入element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 重置ElementUI的message提示框，消除重复点击问题
import { message } from '@utils/resetMessage.js'
Vue.prototype.$msg = message

// 调用axios接口时，用finally函数，常用作于关闭laoding（兼容低版本浏览器）
require('promise.prototype.finally').shim()

// 全局挂载dayjs
import dayjs from 'dayjs'
Vue.prototype.$day = dayjs

// 全局挂载正则校验
import reg from '@utils/reg.js'
Vue.prototype.$reg = reg

// 全局挂载常用组件
import OflowToast from '@components/OflowToast.vue'
Vue.component('jy-oflowToast', OflowToast)
import Table from '@components/Table.vue'
Vue.component('jy-table', Table)
import Form from '@components/Form.vue'
Vue.component('jy-form', Form)
import Modal from '@components/Modal.vue'
Vue.component('jy-modal', Modal)
import DelToast from '@components/DelToast.vue'
Vue.component('jy-delToast', DelToast)

// 使用自定义指令
import directives from '@utils/directives.js'
Vue.use(directives)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
