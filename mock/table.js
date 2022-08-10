/*
 * @Author: RL
 * @Date: 2022-08-05 11:32:08
 * @LastEditors: renl renl19@chinaunicom.cn
 * @LastEditTime: 2022-08-10 15:26:11
 * @Description: 请填写简介
 */
const Mock = require('mockjs')
const Random = Mock.Random; // 获取random对象，随机生成各种数据，具体请翻阅文档
// Mock.setup({
//   timeout: 1000,
// });


module.exports = [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const data = Mock.mock({
        'items|10': [{
          id: '@id',
          title: '@sentence(1,2)',
          'status|1': ['published', 'draft', 'deleted'],
          author: () => Random.cname(),
          display_time: '@datetime',
          pageviews: '@integer(300, 5000)',
          peopleNum: () => Random.integer(5,1000)
        }]
      })
      const fetchItems = () => { return data.items }
      const items = fetchItems()
      
      return {
        code: 20000,
        data: {
          total: items.length * 4,
          items: items
        }
      }
    }
  },
  {
    url: '/vue-admin-template/table/add',
    type: 'post',
    response: config => {      
      return {
        code: 20000,
        data: '操作成功'
      }
    }
  },
  {
    url: '/vue-admin-template/table/edit',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: '操作成功'
      }
    }
  }
]

