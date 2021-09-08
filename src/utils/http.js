/**
 * axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios'
import { Notification } from 'element-ui'
import store from '@/store'
import { router } from '@/router'

const service = axios.create({
  baseURL: window.URL_CONFIG.BASE_API, // 请求地址
  timeout: 30000, // 设置请求超时时间
  withCredentials: false // 设置跨域是否允许携带凭证(开发环境需要配置，因为要使用跨域；生产环境可能需要将其注释掉！)
})

// 设置post请求头
service.defaults.headers.post['Content-Type'] = 'application/json'

// 设置请求拦截器（在项目中客户端向服务器发送请求之前会进行token校验，token存储在vuex或localstorage中）
service.interceptors.request.use(
  config => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了。即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    // 当请求本地Ukey服务时，不带token，否则会有跨域问题
    console.log('config-----', config)
    const token = store.state.user.token
    console.log('token-----', token)
    if (token) {
      config.headers.token = token
    }
    return config
  },
  error => {
    Notification({
      title: '请求错误',
      message: error,
      type: 'error'
    })
    return Promise.reject(error)
  }
)

// 设置响应拦截器
service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response.data)
    }
    Notification({
      title: '接口请求错误',
      message: response.message,
      type: 'error'
    })
  },
  // 服务器状态码不是200的情况
  error => {
    const { response } = error
    // 当服务器返回错误码时
    if (response) {
      switch (response.status) {
        // 登录过期,清楚token并跳转至登录页
        case 401:
          Notification({
            title: '登录过期，请重新登录',
            message: response.data.message,
            type: 'error'
          })
          store.commit('user/SET_TOKEN', '')
          sessionStorage.setItem('store', '')
          router.replace({
            path: '/',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          break
        // 404表示找不到页面
        case 404:
          Notification({
            title: '网络请求不存在',
            message: response.data.message,
            type: 'error'
          })
          break
        case 500:
          Notification({
            title: '请求数据失败',
            message: response.data.message,
            type: 'error'
          })
          break
        default:
          Notification({
            title: '请求数据失败',
            message: response.data.message,
            type: 'error'
          })
      }

      return Promise.reject(response.data)
    } else {
      // 当服务器没有返回结果时，可能是没有网
      if (!window.navigator.onLine) {
        // 如果断网了：可以跳转到断网页面
        Notification({
          title: '请检查网络是否连接正常！',
          message: error,
          type: 'error'
        })
        return
      }
      return Promise.reject(error)
    }
  }
)

/**********************************************
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    service
      .get(url, { params })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 下载excel的二进制流 get请求
export function getFile(url, params = {}) {
  return new Promise((resolve, reject) => {
    service
      .get(url, { params, responseType: 'blob' })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 下载excel的二进制流 post请求
export function getFile2(url, params = {}) {
  return new Promise((resolve, reject) => {
    service
      .post(url, params, { responseType: 'blob' })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**********************************************
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export const post = (url, params) => {
  return new Promise((resolve, reject) => {
    service
      .post(url, params)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**********************************************
 * put方法，对应put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export const put = (url, params) => {
  return new Promise((resolve, reject) => {
    service
      .put(url, params)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**********************************************
 * del方法，对应delete请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export const del = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    service
      .delete(url, {
        params
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * all方法
 *
 *  */
export const all = iterator => {
  return new Promise((resolve, reject) => {
    service
      .all(iterator)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
