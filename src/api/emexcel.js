import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/checkin',
    method: 'get',
    baseURL: process.env.VUE_APP_ROCK_API
  })
}
