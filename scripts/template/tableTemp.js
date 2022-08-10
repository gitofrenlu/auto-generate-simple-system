/*
 * @Author: RL
 * @Date: 2022-08-04 17:32:52
 * @LastEditors: renl 
 * @LastEditTime: 2022-08-10 15:14:00
 * @Description: 请填写简介
 */
// 驼峰转-
function decamelize(string, options) {
  options = options || {}
  var separator = options.separator || '-'
  var split = options.split || /(?=[A-Z])/

  return string.split(split).join(separator).toLowerCase()
}
import sqlJson from '../sql.js'

const tableTemplate = (compoenntName,createName) => {
  const className = `${decamelize(compoenntName)}-container`

  let result = `<template>
  <div class="${className}">
  <el-button type="primary" size="small" class="insert-button" @click="insert"> 添加</el-button>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >`
  result += `<el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>`
  for (const column of sqlJson.tableData) {
    result += `
    <el-table-column label="${column.colunm}">
      <template slot-scope="scope">
        {{ scope.row.${column.val} }}
      </template>
    </el-table-column>`
  }
  result += `
  <el-table-column label="操作">
  <template slot-scope="scope">
     <el-button
       type="text"
       size="mini"
       @click="
         routerTo(
           '${createName}',
           { id: scope.row.id }
         )
       "
       >编辑</el-button
     >
   </template>
</el-table-column>
  `
  result += `
    </el-table>
    <el-pagination
    class="table-pagi"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="pagi.current"
    :page-sizes="[10, 20, 30, 40]"
    :page-size="pagi.size"
    layout="total, sizes, prev, pager, next, jumper"
    :total="pagi.total">
  </el-pagination>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  filters: {},
  data() {
    return {
      list: null,
      listLoading: true,
      pagi: {
        current:1,
        size: 10,
        total: 0
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const param = {
        current: this.pagi.current,
        pageSize: this.pagi.size
      }
      
      this.listLoading = true
      getList('${sqlJson.apiPre}/list',param).then(response => {
        this.list = response.data.items

        this.pagi.total = response.data.total;

        this.listLoading = false
      })
    },
    handleSizeChange(val) {
    this.pagi.size = val
    },
    handleCurrentChange(val) {
      this.pagi.current = val
      this.fetchData()
    },
    insert() { 
      this.routerTo('${createName}')
    },
    routerTo(pageName, query) {
      this.$router.push({
        name: pageName,
        query
      })
    }
  }
}
</script>
<style scoped lang="scss">
.${className}{
  padding: 20px;
  .table-pagi{
    margin: 20px 0;
  }
  .insert-button{
    margin-bottom: 20px;
  }
}
</style>
`
  return result
}

export default tableTemplate

