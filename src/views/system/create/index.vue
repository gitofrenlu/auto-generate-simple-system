
    <template>
    <div class="system-create-form-container">
      <el-form ref="form" :model="form" size="small" label-width="120px">
    
    <el-form-item label="标题:">     
    <el-input v-model="form.title" /></el-form-item>
    <el-form-item label="作者:">     
    
        <el-radio-group v-model="form.author">
        
            <el-radio label="1">是</el-radio>
            
            <el-radio label="0">否</el-radio>
            
        </el-radio-group>
        </el-form-item>
    <el-form-item label="PageViews:">     
    
        <el-checkbox-group v-model="form.pageviews">
        
            <el-checkbox label="1">是</el-checkbox>
            
            <el-checkbox label="0">否</el-checkbox>
            
        </el-checkbox-group>
        </el-form-item>
    <el-form-item label="状态:">     
    
        <el-select v-model="form.status" placeholder="请选择">
        
            <el-option
                key="1"
                label="是"
                value="1">
                </el-option>
            
            <el-option
                key="0"
                label="否"
                value="0">
                </el-option>
            
        </el-select>
        </el-form-item>
    <el-form-item label="修改时间:">     
    
        <el-date-picker
        v-model="form.display_time"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择日期">
        </el-date-picker>
    </el-form-item>
    <el-form-item label="人数:">     
    
        <el-input-number v-model="form.peopleNum"></el-input-number>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="onSubmit">{{id ? '编辑':'创建' }}</el-button>
        <el-button @click="onCancel">取消</el-button>
    </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  import { insertData } from '@/api/table'

  export default {
    name:'systemCreate',
    data() {
      return {
        id:'',
        form: {
          
        title:'',
        
        author:'',
        
        pageviews:[],
        
        status:'',
        
    display_time:'',
    
    peopleNum: 0,
    
        }
      }
    },
    created() { 
        this.id = this.$route.query.id || ''
     },
    methods: {
      onSubmit() {
        let apiUrl = ''
        if (this.id) { 
          apiUrl = '/vue-admin-template/table/edit'
        } else {
            apiUrl = '/vue-admin-template/table/add'
        }
        const param = this.form
        insertData(apiUrl,param).then(response => {
            this.$message.success('操作成功')
            this.$router.push({
                name:'system'
              })
          })
      },
      onCancel() {
        this.$router.push({
            name:'system'
          })
        
      }
    }
  }
  </script>
  
  <style scoped lang="scss">
  .system-create-form-container{
    padding:50px;
    .line{
        text-align: center;
      }
  }
 
  </style>
  
    