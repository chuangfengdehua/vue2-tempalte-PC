import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const modulesFiles = require.context('./modules', true, /\.js$/)
// 通过 context 属性将 所有的文件名设为模块名
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules
})

export default store
