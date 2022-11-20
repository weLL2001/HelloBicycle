import React, { useEffect } from 'react'
import { Card } from 'antd'

const BMapGL = window.BMapGL

export default function BikeMap() {
  const initMap = () => {
    // 1.创建地图实例 传入容器 全局的对象 可以使用window去调用 
    const Map = new BMapGL.Map('container')
    // 2.设置中心点坐标
    const point = new BMapGL.Point(116.504, 39.915)
    // 3.初始化地图，设置展示级别
    Map.centerAndZoom(point, 15)
    // 4.添加地图控件
    Map.addControl(new BMapGL.ScaleControl())
    Map.addControl(new BMapGL.ZoomControl())
    // 5.设置覆盖物
    const icon = new BMapGL.Icon('/assets/bike.jpg', new BMapGL.Size(36, 42), {
      imageSize: new BMapGL.Size(36, 42),
      // 6.设置偏移
      anchor: new BMapGL.Size(18, 42)
    })
    // 7.设置标志点
    const marker = new BMapGL.Marker(point, { icon })

    // 8.添加覆盖物
    Map.addOverlay(marker)
  }

  useEffect(() => {
    initMap()
  }, [])

  return (
    <div style={{ width: '100%' }}>
      <Card>
        <div id="container" style={{ height: 500 }}></div>
      </Card>
    </div>
  )
}
