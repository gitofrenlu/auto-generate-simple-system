<template>
  <div class="system-container">
  <el-button type="primary" size="small" class="insert-button" @click="insert"> 添加</el-button>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    ><el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
    <el-table-column label="标题">
      <template slot-scope="scope">
        {{ scope.row.title }}
      </template>
    </el-table-column>
    <el-table-column label="作者">
      <template slot-scope="scope">
        {{ scope.row.author }}
      </template>
    </el-table-column>
    <el-table-column label="PageViews">
      <template slot-scope="scope">
        {{ scope.row.pageviews }}
      </template>
    </el-table-column>
    <el-table-column label="状态">
      <template slot-scope="scope">
        {{ scope.row.status }}
      </template>
    </el-table-column>
    <el-table-column label="修改时间">
      <template slot-scope="scope">
        {{ scope.row.display_time }}
      </template>
    </el-table-column>
    <el-table-column label="人数">
      <template slot-scope="scope">
        {{ scope.row.peopleNum }}
      </template>
    </el-table-column>
  <el-table-column label="操作">
  <template slot-scope="scope">
     <el-button
       type="text"
       size="mini"
       @click="
         routerTo(
           'systemCreate',
           { id: scope.row.id }
         )
       "
       >编辑</el-button
     >
   </template>
</el-table-column>
  
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
      getList('/vue-admin-template/table/list',param).then(response => {
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
      this.routerTo('systemCreate')
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
.system-container{
  padding: 20px;
  .table-pagi{
    margin: 20px 0;
  }
  .insert-button{
    margin-bottom: 20px;
  }
}
</style>
