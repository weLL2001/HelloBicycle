import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Button } from 'antd'
import request from '../../../utils/request'
import './detail.less'

export default function Detail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [orderInfo, setOrderInfo] = useState([])

  // 请求数据
  const getOrderDetail = async () => {
    try {
      const { data } = await request({
        url: '/more_detail',
        method: 'get',
        params: { id }
      })

      setOrderInfo(data)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    getOrderDetail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{ width: '100%' }}>
      <Card>
        <div className="detail-items">
          <div className="item-title">基础信息</div>
          <ul className="detail-form">
            <li>
              <div className="detail-form-left">用车模式：</div>
              <div className="detail-form-content">
                {orderInfo.mode === 1 ? '服务区' : '停车点'}
              </div>
            </li>
            <li>
              <div className="detail-form-left">订单编号：</div>
              <div className="detail-form-content">{id}</div>
            </li>
            <li>
              <div className="detail-form-left">车辆编号：</div>
              <div className="detail-form-content">{orderInfo.bike_sn}</div>
            </li>
            <li>
              <div className="detail-form-left">用户姓名：</div>
              <div className="detail-form-content">{orderInfo.username}</div>
            </li>
            <li>
              <div className="detail-form-left">手机号码：</div>
              <div className="detail-form-content">{orderInfo.mobile}</div>
            </li>
          </ul>
        </div>
        <div className="detail-items">
          <div className="item-title">行驶轨迹：</div>
          <ul className="detail-form">
            <li>
              <div className="detail-form-left">行程起点：</div>
              <div className="detail-form-content">{orderInfo.start}</div>
            </li>
            <li>
              <div className="detail-form-left">行程终点：</div>
              <div className="detail-form-content">{orderInfo.end}</div>
            </li>
            <li>
              <div className="detail-form-left">行驶里程</div>
              <div className="detail-form-content">
                {orderInfo.distance}公里
              </div>
            </li>
          </ul>
        </div>
        <Button type="primary" onClick={() => navigate(-1)}>
          返回
        </Button>
      </Card>
    </div>
  )
}
