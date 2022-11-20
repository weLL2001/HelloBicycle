import React,{ useState, useEffect,useMemo } from 'react'
import { Row, Col } from 'antd'
import moment from 'moment'
// import { useSelector } from 'react-redux'
import 'moment/locale/zh-cn'
import './index.less'
import { useRedux } from '../../hooks/useRedux'
import { getWeather } from '../../model/global'
moment.locale('zh-cn')
export default function Header() {
  const getTime = () =>{
    return moment().format('dddd h:mm:ss a')
  }
  const [name] = useState('作者')
  const [time, setTime] = useState(getTime())
  const [weather, setWeather] = useState()
  const {state}  = useRedux()
  // const menu = useSelector(state => state.menu)
  const getWeatherStatus = async() => {
    try {
      const data = await getWeather()
      setWeather(data.weather)
    } catch (error) {
      throw new Error(error)
    }
  }
  useEffect(() => {
    const timer = setInterval(() => {
      let time = getTime()
      setTime(time)
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  })

  useEffect(() => {
    getWeatherStatus()
  },[])
  
  return useMemo(() => {
    return (
        <div className="warpper__right__header">
          <Row className="warpper__right__top">
            <Col span="24">
              <span>欢迎，{name}</span>
              <a href="/#">退出</a>
            </Col>
          </Row>
          <Row className="warpper__right__breadcrumb">
            <Col span="4" className="breadcrumb__title">
              {/* {menu.current} */}
              {state.current}
            </Col>
            <Col span="20" className="warpper__right__weather">
              <span className="weather__date">{time}</span>
              <span className="weather__weather__detail">天气：{weather}</span>
            </Col>
          </Row>
       </div>
    )
  },[name, state, time, weather])
}
