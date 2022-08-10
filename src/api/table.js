import request from '@/utils/HttpUtil/http'

export function getList(url,params) {
  return request(
    url,
    'get',
    params
  )
}

export function insertData(url,data) {
  return request(
    url,
    'post',
    data
  )
}