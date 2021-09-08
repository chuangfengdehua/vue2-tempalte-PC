/*
    该文件仅供前端查找路由时查看！！！配置好后，按照固定格式创给后端，做动态路由 ！！
*/

const LayOut = () => import('@/layout/index.vue')
const BlankRoute = () => import('@/layout/BlankRoute.vue')
// 动态路由
// eslint-disable-next-line no-unused-vars
let asyncRoutes = [
  {
    path: '/layOut',
    component: LayOut,
    redirect: '/layOut/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/pages/home/index.vue'),
        meta: { title: '主页', svg: '9-screen', roles: ['superAdmin', 'admin', 'user1', 'user2'] }
      },
      {
        path: 'list',
        name: 'List',
        component: BlankRoute,
        meta: { title: '列表页', svg: '9-screen' },
        redirect: '/layOut/list/listchild1',
        children: [
          {
            path: 'listchild1',
            name: 'Listchild1',
            component: BlankRoute,
            meta: { title: '列表儿子页1', svg: '6-screen' },
            redirect: '/layOut/list/listchild1/listGrandson',
            children: [
              {
                path: 'listGrandson',
                name: 'ListGrandson',
                component: () => import('@/pages/list/listchild1/listGrandson/index.vue'),
                meta: { title: '列表孙子页', svg: '4-screen', roles: ['superAdmin', 'admin', 'user1'] }
              }
            ]
          },
          {
            path: 'listchild2',
            name: 'Listchild2',
            component: () => import('@/pages/list/listchild2/index.vue'),
            meta: { title: '列表儿子页2', svg: '6-screen', roles: ['superAdmin', 'admin', 'user1'] }
          },
          {
            path: 'listchild3',
            name: 'Listchild3',
            component: () => import('@/pages/list/listchild3/index.vue'),
            meta: { title: '列表儿子页3', svg: '6-screen', roles: ['superAdmin', 'admin', 'user2'] }
          }
        ]
      }
    ]
  }
]
