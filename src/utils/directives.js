/*
 * @描述信息: Vue2.x自定义指令
 *
 * main.js==》
 *      import directives from 'zls/directives'
 *      Vue.use(directives)
 *
 * 1、v-debounce         输入框防抖指令    入参：callback回调函数     <input v-debounce="inputFn" placeholder="请输入" v-model="inputValue" />
 * 2、v-throttle         点击按钮防抖      入参：callback回调函数     <button v-throttle="btnFn">点击按钮时，节流</button>
 * 3、v-permission       权限校验指令(不需要任何入参，直接使用v-permission)
 * 4、v-waterMarker      实现页面水印      入参：一个对象object:{ text: '微明科技', color: '#ddd', fontSize: '30' }; 有默认值，可不传
 * 5、v-drag             拖拽指令(PC端)(不需要任何入参，直接使用v-drag)
 */
import store from '@/store/index.js'

//输入框防抖指令(防止输入框在短时间内被多次输入)
const debounce = {
  inserted: function (el, { value }) {
    if (typeof value !== 'function') {
      console.error('Please enter a function')
      return
    }
    let timer = null
    el.addEventListener('input', () => {
      timer && clearTimeout(timer)
      timer = setTimeout(() => {
        value()
      }, 1000)
    })
  }
}

// 点击事件节流
const throttle = {
  inserted: function (el, { value }) {
    let timer, timer_end
    el.addEventListener('click', () => {
      if (timer) {
        clearTimeout(timer_end)
        return (timer_end = setTimeout(() => value(), 2000))
      }
      value()
      timer = setTimeout(() => (timer = null), 2000)
    })
  }
}

//权限指令（PC）
const permission = {
  inserted: function (el, binding, vnode) {
    let roles = vnode.context.$route.meta.roles // 当前路由的权限列表
    let role = store.state.user.userInfo.role // 当前用户角色
    let hasPermission = checkArray(roles, role)
    if (!hasPermission) el.parentNode && el.parentNode.removeChild(el) // 没有权限 移除Dom元素
  }
}
function checkArray(roles, role) {
  if (!role) return false
  return roles.indexOf(role) > -1
}

//给整个页面添加背景水印
const waterMarker = {
  bind: function (el, { value = {} }) {
    if (Object.prototype.toString.call(value).slice(8, -1).toLocaleLowerCase() != 'object') {
      console.error('Please enter an object')
      return
    }
    addWaterMarker(value.text, value.fontSize, value.color, el)
  }
}
function addWaterMarker(str, fontSize, color, parentNode) {
  // 水印文字，父元素，字体，文字颜色
  var can = document.createElement('canvas')
  parentNode.appendChild(can)
  can.width = 200
  can.height = 150
  can.style.display = 'none'
  var cans = can.getContext('2d')
  cans.rotate((-20 * Math.PI) / 180)
  cans.font = fontSize ? fontSize + 'px Microsoft JhengHei' : '20px Microsoft JhengHei'
  cans.fillStyle = color || 'rgba(180, 180, 180, 0.3)'
  cans.textAlign = 'left'
  cans.textBaseline = 'Middle'
  cans.fillText(str || '水印', can.width / 10, can.height / 2)
  parentNode.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')'
}

// 拖拽指令
const drag = {
  bind(el, binding) {
    el.onmousedown = function (e) {
      let disX = e.clientX - el.offsetLeft
      let disY = e.clientY - el.offsetTop
      document.onmousemove = function (e) {
        let L = e.clientX - disX
        let T = e.clientY - disY
        if (binding.modifiers.limit) {
          if (L < 0) {
            L = 0
          }
        }
        el.style.left = L + 'px'
        el.style.top = T + 'px'
      }
      document.onmouseup = function () {
        document.onmousemove = null
      }
    }
  }
}

const directives = {
  debounce,
  throttle,
  permission,
  waterMarker,
  drag
}

export default {
  install(vue) {
    Object.keys(directives).forEach(key => {
      vue.directive(key, directives[key])
    })
  }
}
