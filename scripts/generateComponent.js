/*
 * @Author: RL
 * @Date: 2022-08-04 17:32:18
 * @LastEditors: renl 
 * @LastEditTime: 2022-08-10 16:50:56
 * @Description: 请填写简介
 */
// index.js
import { createRequire } from 'module'
import sqlJson from './sql.js'

const require = createRequire(import.meta.url)

const chalk = require('chalk')
const path = require('path')
const __dirname = path.resolve()

const fs = require('fs')
const resolve = (...file) => path.resolve(__dirname, ...file)
const log = message => console.log(chalk.green(`${message}`))
const successLog = message => console.log(chalk.blue(`${message}`))
const warngingLog = message => console.log(chalk.yellow(`${message}`))
const insertLog = message => console.log(chalk.white(`${message}`))

log(__dirname)
const errorLog = error => console.log(chalk.red(`${error}`))
// 导入模板
import { tableTemplate, fromTemplate } from './template/index.js'

// 生成文件
const generateFile = (path, data) => {
  if (fs.existsSync(path)) {
    errorLog(`${path}文件已存在`)
    return
  }
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, 'utf8', err => {
      if (err) {
        errorLog(err.message)
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}
// 读取用户输入
async function readlineSync() {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
  return new Promise((resolve, reject) => {
    readline.question(``, data => {
      readline.close()
      resolve(data)
    })
  })
}

async function main() {
  let componentName = ''; let inputName = ''

  log(`请输入要生成的页面组件名称、会生成在 views/目录下`)
  insertLog(`
    eg : (testPage) => 
      生成 views/testPage/index.vue
    `)

  // 组件名称
  inputName = await readlineSync()
  inputName = String(inputName).trim().toString()

  log(`页面数据会读取sql.js文件内容，请按要求填写`)
 
  // let apiPre = await readlineSync()
  // apiPre = String(apiPre).trim().toString()


  // log(`请输入要生成的页面title名称`)
  // let pageTitle = await readlineSync()
  // pageTitle = String(pageTitle).trim().toString()

  // log(`是否添加到菜单(Y/N)`)
  // let isMenu = await readlineSync()
  // isMenu = !!String(isMenu).trim().toString().toUpperCase() === 'Y'

  // const table = 'T'; const form = 'F'
  // log(`请输入要生成的页面组件类型：
  //   （${table}）- table 
  //    (${form}) - form`)

  // let pageType = table
  // pageType = await readlineSync()
  // pageType = String(pageType).trim().toString().toUpperCase() === table ? table : form

  // Vue页面组件路径
  const componentPath = resolve('./src/views', inputName)
  const componentFormPath = resolve('./src/views', `${inputName}/create`)
  // log(componentPath)
  // vue文件
  const vueFile = resolve(componentPath, 'index.vue')
  const vueFormFile = resolve(componentFormPath, 'index.vue')

  // 判断组件文件夹是否存在
  const hasComponentExists = fs.existsSync(componentPath)

  if (hasComponentExists) {
    errorLog(`${inputName}页面组件已存在，请重新输入`)
    return
  } else {
    log(`正在生成 component 目录 ${componentPath}`)
    await dotExistDirectoryCreate(componentPath)
    await dotExistDirectoryCreate(componentFormPath)
  }
  try {
    // 获取组件名
    if (inputName.includes('/')) {
      const inputArr = inputName.split('/')
      componentName = inputArr[inputArr.length - 1]
    } else {
      componentName = inputName
    }
    const createName = `${componentName}Create`

    log(`正在生成 table 文件 ${vueFile}...`)
    await generateFile(vueFile, tableTemplate(componentName,createName))

    log(`正在生成 form  ${vueFile}...`)
    await generateFile(vueFormFile, fromTemplate(createName,componentName))
    
    successLog('生成成功')

    insertLog(`
        自动生成api路径：
        查询列表接口 ${sqlJson.apiPre}/list
        添加条目接口 ${sqlJson.apiPre}/add
        修改条目接口 ${sqlJson.apiPre}/edit`)
    
    warngingLog('手动添加路由至 tableGenerate.js ：')
    insertLog(` {
          'path': '${componentName}',
          'name': '${componentName}',
          'component': () => import('@/views/${componentName}/index'),
           hidden: false,
          'meta': {
            'title': '${sqlJson.title}',
          }
        },
        {
          'path': '${createName}',
          'name': '${createName}',
          'component': () => import('@/views/${componentName}/create/index'),
           hidden: true,
          'meta': {
            'title': '${sqlJson.title}操作',
          }
        }
      `)
  } catch (e) {
    errorLog(e.message)
  }
  process.stdin.emit('end')
}

process.stdin.on('end', () => {
  log('exit')
  process.exit()
})

function dotExistDirectoryCreate(directory) {
  return new Promise((resolve) => {
    mkdirs(directory, function() {
      resolve(true)
    })
  })
}
// 递归创建目录
function mkdirs(directory, callback) {
  var exists = fs.existsSync(directory)
  if (exists) {
    callback()
  } else {
    mkdirs(path.dirname(directory), function() {
      fs.mkdirSync(directory)
      callback()
    })
  }
}

main()
