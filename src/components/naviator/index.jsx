import React ,{useEffect,useState}from 'react'
import request from '../../utils/request'
import { Menu } from 'antd'
import './index.less'


export default function Naviator() {
  const [menu, setMenu] = useState([])
  
  const getMenu = async()=>{
    try{
      const data = await request('/menu')
      setMenu(data.menu)
    }catch(error){
      throw new Error(error)
    }
  }
  useEffect(()=>{
    getMenu()
  },[])

  const click = e=>{
    console.log(e.key)
  }
  return (
    <>
        <div className="warpper__left__logo">
        {/* public 目录 最后会打包生成目录，一般我们会把静态资源放到 public下边，部署的时候public不会部署 */}
        <img src="/assets/logo-ant.svg" alt="金渡CMS" />
        <h1>HELLO单车</h1>
      </div>

      <Menu
        defaultSelectedKeys={['/home']}
        items={menu}
        theme = 'dark'
        onClick = {click}
      />
    </>
  )
}
