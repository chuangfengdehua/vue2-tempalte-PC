import store from '@/store'
import router from './index'
import { resetRouter } from './index'
// 在页面加载时读取sessionStorage里的状态信息，将store的所有数据重新覆盖！
if (sessionStorage.getItem('store')) {
  store.replaceState(Object.assign({}, store.state, JSON.parse(sessionStorage.getItem('store'))))
}
// 在页面刷新时将vuex里的信息保存到sessionStorage里
window.addEventListener('beforeunload', () => {
  sessionStorage.setItem('store', JSON.stringify(store.state))
})

// 根据token进行路由拦截
router.beforeEach(async (to, from, next) => {
  const hasToken = store.state.user.token
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/layout' })
    } else if (to.path === '/wrong') {
      resetRouter()
      next()
    } else {
      if (router.getRoutes().length === 3) {
        try {
          const asyncRoutes = await store.dispatch('user/GETASYNCROUTES')
          router.addRoute(asyncRoutes[0])
          router.addRoute({ path: '*', redirect: '/wrong' })
          next({ ...to, replace: true })
        } catch (error) {
          console.log('--添加动态路由的error--', error)
        }
      } else {
        next()
      }
    }
  } else {
    if (to.path === '/login') {
      next()
      return
    }
    next({ path: '/login' })
  }
})
