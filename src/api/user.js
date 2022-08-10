/*
 * @Author: renl 
 * @Date: 2022-08-05 11:32:08
 * @LastEditors: renl 
 * @LastEditTime: 2022-08-10 14:47:12
 * @FilePath: /auto-generate-table/src/api/user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/HttpUtil/http'

export function login(data) {
  return request(
    '/vue-admin-template/user/login',
    'post',
    data
  )
}

export function getInfo(token) {
  return request(
    '/vue-admin-template/user/info',
    'get',
    { token }
  )
}

export function logout() {
  return request(
    '/vue-admin-template/user/logout',
    'post'
  )
}
