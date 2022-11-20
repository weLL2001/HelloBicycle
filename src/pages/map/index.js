import React, { useEffect, useState } from 'react'
import { Card, Form, Button, Select, Modal } from 'antd'
import {queryMap,bikeMap} from '../../model/map'  
const BMapGL = window.BMapGL
const FormItem = Form.Item
export default function BikeMap() {
  const [form] = Form.useForm()
  const [cityList, setCityList] = useState([])
  const [point, setPoint] = useState({
    lng: 114.432537,
    lat: 30.468295
  })
  const [bikeList, setBikeList] = useState([])

  // 获取城市列表
  const getCityList = async () => {
    try {
      const { data } = await queryMap()
      // console.log(data)
      if (!data) {
        return Modal.error({
          title: '数据加载出错'
        })
      }

      if (data.code === 200) {
        setCityList(data.city)
        initMap()
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  // 选择城市id
  const selectCityId = () => {
    const id = form.getFieldValue().city_id
    setPoint({
      lng: cityList[id].point.lng,
      lat: cityList[id].point.lat
    })
  }

  const getCityId = async values => {
    const { city_id } = values
    if (city_id === undefined) {
      return Modal.error({
        title: '请选择城市'
      })
    }

    // 发送请求获取车辆的坐标信息
    try {
      const { data } = await bikeMap({ city_id })
      if (data.code === 200) {
        setBikeList(data.bike_list)
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  // 初始化地图
  const initMap = () => {
    // 1.创建地图实例 传入容器 全局的对象 可以使用window去调用
    const Map = new BMapGL.Map('container')
    // 2.设置中心点坐标
    const centerPoint = new BMapGL.Point(point.lng, point.lat)
    // 3.初始化地图，设置展示级别
    Map.centerAndZoom(centerPoint, 12)
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
    // const marker = new BMapGL.Marker(point, { icon })

    // // 8.添加覆盖物
    // Map.addOverlay(marker)

    bikeList.forEach(item => {
      const bikePoint = new BMapGL.Point(item.lng, item.lat)
      const bikeMarker = new BMapGL.Marker(bikePoint, { icon })
      Map.addOverlay(bikeMarker)
    })
  }

  // 添加特定依赖 首次执行的时候 依赖值发生变化的时候会执行
  useEffect(() => {
    getCityList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [point,bikeList])

  return (
    <div style={{ width: '100%' }}>
      <Card>
        <Form form={form} layout="inline" onFinish={getCityId}>
          <FormItem label="请选择城市" name="city_id">
            <Select
              style={{ width: 150 }}
              placeholder="请选择城市"
              options={cityList.map((item, index) => ({
                label: item.name,
                value: index
              }))}
              onSelect={selectCityId}
            ></Select>
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              style={{ marginRight: 20 }}
              htmlType="submit"
            >
              查询
            </Button>
            <Button
              type="primary"
              onClick={() => {
                form.resetFields()
              }}
            >
              重置
            </Button>
          </FormItem>
        </Form>
      </Card>
      <Card>
        <div id="container" style={{ height: 500 }}></div>
      </Card>
    </div>
  )
}
