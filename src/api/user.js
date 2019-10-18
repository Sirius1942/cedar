import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data,
    baseURL: process.env.VUE_APP_ROCK_API
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    baseURL: process.env.VUE_APP_ROCK_API
    // params: { token }  使用jwt模式 token在消息头中
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post',
    baseURL: process.env.VUE_APP_ROCK_API

  })
}
