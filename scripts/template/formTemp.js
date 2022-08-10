/*
 * @Author: RL
 * @Date: 2022-08-04 17:32:52
 * @LastEditors: renl 
 * @LastEditTime: 2022-08-10 16:52:29
 * @Description: 请填写简介
 */
// 驼峰转-
import TYPE from '../constType.js'
import sqlJson from '../sql.js'

function decamelize(string, options) {
  options = options || {}
  var separator = options.separator || '-'
  var split = options.split || /(?=[A-Z])/

  return string.split(split).join(separator).toLowerCase()
}
let formData = ``
const getFormItem = (row) => { 
    const { type, val } = row
    let itemStr = ``
    if (type === TYPE.RADIO) { 
        const options = row.options
        itemStr = `
        <el-radio-group v-model="form.${val}">
        `
        for (const item of options) { 
            itemStr += `
            <el-radio label="${item.val}">${item.lable}</el-radio>
            `
        }
        itemStr +=`
        </el-radio-group>
        `
        formData += `
        ${val}:'',
        `
    } else if (type == TYPE.CHECKBOX) { 
        const options = row.options
        itemStr = `
        <el-checkbox-group v-model="form.${val}">
        `
        for (const item of options) { 
            itemStr += `
            <el-checkbox label="${item.val}">${item.lable}</el-checkbox>
            `
        }
        itemStr +=`
        </el-checkbox-group>
        `
        formData += `
        ${val}:[],
        `
    } else if (type == TYPE.SELECT) { 
        const options = row.options
        itemStr = `
        <el-select v-model="form.${val}" placeholder="请选择">
        `
        for (const item of options) { 
            itemStr += `
            <el-option
                key="${item.val}"
                label="${item.lable}"
                value="${item.val}">
                </el-option>
            `
        }
        itemStr +=`
        </el-select>
        `
        formData += `
        ${val}:'',
        `
    }else if (type == TYPE.DATE) { 
        itemStr = `
        <el-date-picker
        v-model="form.${val}"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择日期">
        </el-date-picker>
    `
    formData += `
    ${val}:'',
    `
    }else if (type == TYPE.NUMBER) { 
        itemStr = `
        <el-input-number v-model="form.${val}"></el-input-number>
    `
    formData += `
    ${val}: 0,
    `
    }
    else {
        itemStr = `<el-input v-model="form.${val}" />`
        formData += `
        ${val}:'',
        `
    }
    return itemStr

}
const fromTemplate = (compoenntName,tableName) => {
const className = `${decamelize(compoenntName)}-form-container`
let result =  `
    <template>
    <div class="${className}">
      <el-form ref="form" :model="form" size="small" label-width="120px">
    `
for (const row of sqlJson.tableData) {
    result += `
    <el-form-item label="${row.colunm}:">     
    `
    result +=  getFormItem(row)
        
    result += `</el-form-item>`
}
result += `
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
    name:'${compoenntName}',
    data() {
      return {
        id:'',
        form: {
          ${formData}
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
          apiUrl = '${sqlJson.apiPre}/edit'
        } else {
            apiUrl = '${sqlJson.apiPre}/add'
        }
        const param = this.form
        insertData(apiUrl,param).then(response => {
            this.$message.success('操作成功')
            this.$router.push({
                name:'${tableName}'
              })
          })
      },
      onCancel() {
        this.$router.push({
            name:'${tableName}'
          })
        
      }
    }
  }
  </script>
  
  <style scoped lang="scss">
  .${className}{
    padding:50px;
    .line{
        text-align: center;
      }
  }
 
  </style>
  
    `
    return result
}

export default fromTemplate

