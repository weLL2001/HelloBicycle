import axios from 'axios'
import { BASE_URL, TIMEOUT } from './config'
import ReactDOM from 'react-dom/client'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
const request = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT
})
const showLoading = () => {
  // 为0的时候显示，否则有多少个请求就显示多少个loading
  if (requestCount === 0) {
    const div = document.createElement('div')
    div.setAttribute('class', 'load')
    document.body.appendChild(div)
    const render = ReactDOM.createRoot(div)
    render.render(
      <Spin
        size="large"
        indicator={<LoadingOutlined />}
      />
    )
  }

  // 继续请求
  requestCount++
}
// 隐藏loading
const hideLoading = () => {
  // 减少请求的次数
  requestCount--
  // 当请求为0的时候删除元素
  if (requestCount === 0) {
    document.body.removeChild(document.querySelector('.load'))
  }
}
let requestCount = 0
// 请求拦截器
request.interceptors.request.use(
  config => {
    // 1.发送网络请求的，显示Loading
    // 2.用户请求必须携带token
    // 3.参数的序列化操作
    showLoading()
    return config
  },
  err => {
    return err
  }
)


// 响应拦截器
request.interceptors.response.use(
  res => {
    hideLoading()
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