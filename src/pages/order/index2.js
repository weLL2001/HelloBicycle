import React, { useEffect } from 'react'
import {
  Card,
  Button,
  Table,
  Form,
  Select,
  Modal,
  DatePicker,
  message
} from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { orderListData } from '../../store/orderSlice'

import FilterOrder from './FilterOrder'

export default function Detail() {
  const { orderList } = useSelector(state => state.order)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(orderListData())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columns = [
    {
      title: '订单编号',
      dataIndex: 'order_sn'
    },
    {
      title: '车辆编号',
      dataIndex: 'bike_sn'
    },
    {
      title: '用户名',
      dataIndex: 'user_name'
    },
    {
      title: '手机号',
      dataIndex: 'mobile'
    },
    {
      title: '里程',
      dataIndex: 'distance',
      render(distance) {
        return distance / 1000 + 'Km'
      }
    },
    {
      title: '行驶时长',
      dataIndex: 'total_time'
    },
    {
      title: '状态',
      dataIndex: 'status'
    },
    {
      title: '开始时间',
      dataIndex: 'start_time'
    },
    {
      title: '结束时间',
      dataIndex: 'end_time'
    },
    {
      title: '订单金额',
      dataIndex: 'total_fee'
    },
    {
      title: '实付金额',
      dataIndex: 'user_pay'
    }
  ]

  const rowSelection = {
    // 默认是checkbox
    type: 'radio'
  }

  return (
    <div style={{ width: '100%' }}>
      <Card>
        <FilterOrder />
      </Card>
      <Card style={{ marginTop: 15 }}>
        <Button type="primary" style={{ marginRight: 15 }}>
          订单详情
        </Button>
        <Button type="primary">结束订单</Button>
      </Card>
      <Card>
        <Table
          columns={columns}
          dataSource={orderList.item_list}
          bordered
          rowSelection={rowSelection}
        />
      </Card>
    </div>
  )
}
