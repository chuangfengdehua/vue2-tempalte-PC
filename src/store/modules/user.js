const state = {
  token: '', // token值
  userInfo: {}, // 用户信息
  asyncRoutes: [], // 保存动态路由表（解析过的）
  // 保存快捷导航数组 { label是导航名称、name是导航路径、flag用于当前导航的缓存，刷新页面后归位 }
  navigationRoutes: [{ label: '主页', name: '/layOut/home', flag: true }]
}

const mutations = {
  // 保存token
  SET_TOKEN: (state, str) => {
    state.token = str
  },
  // 保存用户信息
  SET_USERINFOR: (state, obj) => {
    state.userInfo = obj
  },
  // 保存路由信息表（后台给的）
  SET_ROUTES: (state, arr) => {
    state.asyncRoutes = arr
  },
  // 保存快捷导航数组
  SET_NAVIGATIONROUTES: (state, arr) => {
    state.navigationRoutes = arr
  }
}

const actions = {
  // 从后台获取路由表信息，并解析(动态路由的接口要单独提供)
  GETASYNCROUTES: ({ commit }) => {
    return new Promise(resolve => {
      setTimeout(() => {
        // 动态路由表
        let routes = [
          {
            path: '/layOut',
            name: 'LayOut',
            component: 'LayOut',
            redirect: '/layOut/home',
            children: [
              {
                path: 'home',
                name: 'Home',
                component: 'home',
                meta: { title: '主页', svg: '9-screen', roles: ['superAdmin', 'admin', 'user1', 'user2'] }
              },
              {
                path: 'list',
                name: 'List',
                component: 'BlankRoute',
                meta: { title: '列表页', svg: '9-screen' },
                redirect: '/layOut/list/listchild1',
                children: [
                  {
                    path: 'listchild1',
                    name: 'Listchild1',
                    component: 'BlankRoute',
                    meta: { title: '列表儿子页1', svg: '6-screen' },
                    redirect: '/layOut/list/listchild1/listGrandson',
                    children: [
                      {
                        path: 'listGrandson',
                        name: 'ListGrandson',
                        component: 'list/listchild1/listGrandson',
                        meta: { title: '列表孙子页', svg: '4-screen', roles: ['superAdmin', 'admin', 'user1'] }
                      }
                    ]
                  },
                  {
                    path: 'listchild2',
                    name: 'Listchild2',
                    component: 'list/listchild2',
                    meta: { title: '列表儿子页2', svg: '6-screen', roles: ['superAdmin', 'admin', 'user1'] }
                  },
                  {
                    path: 'listchild3',
                    name: 'Listchild3',
                    component: 'list/listchild3',
                    meta: { title: '列表儿子页3', svg: '6-screen', roles: ['superAdmin', 'admin', 'user2'] }
                  }
                ]
              }
            ]
          }
        ]
        const asyncRoutes = formatRoutes(routes)
        commit('SET_ROUTES', asyncRoutes)
        resolve(asyncRoutes)
      }, 500)
    })
  }
}

// 解析从后台获取异步路由表信息
const LayOut = () => import('@/layout/index.vue')
const BlankRoute = () => import('@/layout/BlankRoute.vue')
export function formatRoutes(routes) {
  const arr = []
  routes.forEach(v => {
    let comp = v.component
    if (comp) {
      switch (comp) {
        case 'LayOut':
          v.component = LayOut
          break
        case 'BlankRoute':
          v.component = BlankRoute
          break
        default:
          try {
            v.component = () => import('@/pages/' + comp + '/index.vue')
          } catch (err) {
            v.component = BlankRoute
          }
      }
    }
    if (v.children && v.children.length) {
      v.children = formatRoutes(v.children)
    }
    arr.push(v)
  })
  return arr
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
