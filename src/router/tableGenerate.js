/*
 * @Author: RL
 * @Date: 2022-08-05 14:58:53
 * @LastEditors: renl renl19@chinaunicom.cn
 * @LastEditTime: 2022-08-10 16:51:24
 * @Description: 请填写简介
 */
export default
[
  {
    'path': 'user',
    'name': 'user',
    'component': () => import('@/views/user/index'),
     hidden: false,
    'meta': {
      'title': '用户管理',
    }
  },
  {
    'path': 'userCreate',
    'name': 'userCreate',
    'component': () => import('@/views/user/create/index'),
     hidden: true,
    'meta': {
      'title': '用户管理操作',
    }
    },
    {
      'path': 'system',
      'name': 'system',
      'component': () => import('@/views/system/index'),
       hidden: false,
      'meta': {
        'title': '系统配置',
      }
    },
    {
      'path': 'systemCreate',
      'name': 'systemCreate',
      'component': () => import('@/views/system/create/index'),
       hidden: true,
      'meta': {
        'title': '系统配置操作',
      }
    }
]
