import React ,{useEffect,useState,useMemo}from 'react'
import {useNavigate} from 'react-router-dom'
import { Menu } from 'antd'
import './index.less'
import {useRedux}  from '../../hooks/useRedux'
import {getMenu} from '../../model/global'
// import { useDispatch } from 'react-redux'
// import { setCurrent } from '../../store/menuSlice'

export default function Naviator() {
  const [menu, setMenu] = useState([])
  const navigate = useNavigate()
  const {actions}  = useRedux()
  // const dispatch = useDispatch()
  const getMenuList = async()=>{
    try{
      const data = await getMenu()
      console.log(data)
      setMenu(data.menu)
    }catch(error){
      throw new Error(error)
    }
  }
  useEffect(()=>{
    getMenuList()
  },[])

  const click = e=>{ 
    navigate(e.key)
    // dispatch(setCurrent(e.domEvent.target.innerText))
    actions.global.setCurrent(e.domEvent.target.innerText)
  }
  return useMemo(() => {
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
        mode="inline"
        onClick = {click}
      />
    </>
    )
  },[menu])
}
