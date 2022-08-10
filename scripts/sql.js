/*
 * @Author: RL
 * @Date: 2022-08-05 16:33:08
 * @LastEditors: renl 
 * @LastEditTime: 2022-08-10 15:55:32
 * @Description: 生成页面所需json
 */
import TYPE from './constType.js'

export default {
  title:'用户管理',
  apiPre:'/vue-admin-template/table',
  tableData:[
    {
      colunm: '标题',
      val: 'title',
      type: TYPE.STRING
    },
    {
      colunm: '作者',
      val: 'author',
      type: TYPE.RADIO,
      options: [{
        lable: '是',
        val:1
      },
      {
        lable: '否',
        val:0
      }]
    },
    {
      colunm: 'PageViews',
      val: 'pageviews',
      type: TYPE.CHECKBOX,
      options: [{
        lable: '是',
        val:1
      },
      {
        lable: '否',
        val:0
      }]
    },
    {
      colunm: '状态',
      val: 'status',
      type: TYPE.SELECT,
      options: [{
        lable: '是',
        val:1
      },
      {
        lable: '否',
        val:0
      }]
    },
    {
      colunm: '修改时间',
      val: 'display_time',
      type: TYPE.DATE
    },
    {
      colunm: '人数',
      val: 'peopleNum',
      type: TYPE.NUMBER
    }
  ]
  
} 