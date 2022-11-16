import axios from 'axios'
import { BASE_URL, TIMEOUT } from './config'
const request = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT
  })


  // 请求拦截器
request.interceptors.request.use(
    config => {
      // 1.发送网络请求的，显示Loading
      // 2.用户请求必须携带token
      // 3.参数的序列化操作
      console.log('我的请求被了拦截了，请你做你要做的操作')
      return config
    },
    err => {
      return err
    }
  )


// 响应拦截器
request.interceptors.response.use(
    res => {
      return res.data
    },
    
    err => {
      if (err && err.response) {
        switch (err.response.status) {
          case 400:
            console.log('请求错误')
            break
          case 401:
            console.log('未经授权')
            break
          default:
            console.log('其他错误信息')
        }
      }
      return err
    }
  )


  export default request