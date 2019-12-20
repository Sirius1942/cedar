import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/checkin',
    method: 'get',
    baseURL: process.env.VUE_APP_ROCK_API,
    params: { limit: data.limit, offset: data.offset }
  })
}
