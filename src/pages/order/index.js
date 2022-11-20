import React, { useState, useEffect } from 'react'
import { Card, Button, Table, Form, Select, Modal, DatePicker } from 'antd'
import { useNavigate } from 'react-router-dom'
import {getOrderList} from '../../model/order'
import {getOrderFilter} from '../../model/order'
import {getOrderDetailById} from '../../model/order'
import {OrderClose} from '../../model/order'
import moment from 'moment'

import { uniqueKey } from '../../utils/utils'

const FormItem = Form.Item
const Option = Select.Option

export default function Detail() {
  const [list, setList] = useState([])
  const [orderSn, setOrderSn] = useState(0)
  const [orderInfo, setOrderInfo] = useState([])
  const [modal, setModal] = useState(false)
  const [form] = Form.useForm()
  const navigate = useNavigate()

  // 重置表单
  const onReset = () => {
    form.resetFields()
  }

  const getList = async () => {
    try {
      const { data } = await getOrderList()
      setList(uniqueKey(data.item_list))
    } catch (error) {
      throw new Error(error)
    }
  }

  // 组件依赖的数据
  useEffect(() => {
    getList()
  }, [])

  
  // 订单筛选
  const getData = async values => {
    // console.log(values)
    const { start_time, end_time, status } = values
    // 获取当前时间戳 时间戳传递给后台  Unix 时间戳是从1970年1月1日（UTC/GMT的午夜）开始所经过的秒数 X 返回的是经过的秒数
    const start = moment(start_time).format('X')
    const end = moment(end_time).format('X')
    const params = { start, end, status }

    const { data } = await getOrderFilter(params)
    setList(
      data.item_list.map(item => {
        item.key = item.id
        return item
      })
    )
  }

  const finishOrder = async () => {
    // 判断对象是否为空
    if (orderSn === 0) {
      return Modal.error({
        title: '请选择订单'
      })
    }
    try {
      const { data } = await getOrderDetailById({ orderSn })
      if (data.code === 200) {
        setModal(true)
        setOrderInfo(data.detail)
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  // 结束订单的时候将订单编号传递给后台接口
  const colseOrder = async () => {
    const { data } = await OrderClose({ orderSn })
    try {
      if (data.code === 200) {
        // 前端删除效果，真实的删除是在后端服务器删除
        const filterList = list.filter(list => list.orderSn !== orderSn)
        setList(filterList)
        // 删除完毕以后需要重新发起请求
        getList()
        Modal.success({
          content: data.message
        })
        setModal(false)
        setOrderSn(0)
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  // 订单详情
  const orderDetail = () => {
    if (orderSn === 0) {
      return Modal.error({
        title: '请选择订单'
      })
    }
    navigate(`/detail/${orderSn}`)
  }

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
      dataIndex: 'status',
      render(status) {
        return status === 1 ? '进行中':'行程结束'
      }
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
    type: 'radio',
    onChange: (selectedRowKeys, selectedRows) => {
      /* 
       selectedRowKeys: 用户选中的key
        selectedRows: [] 用户选中的数据都会存放在这个数组里
      */

      setOrderSn(selectedRows[0].order_sn)
    }
  }

  return (
    <div style={{ width: '100%' }}>
      <Card>
        <Form layout="inline" onFinish={getData} form={form}>
          <FormItem name="start_time">
            <DatePicker
              placeholder="请选择开始时间"
              format="YYYY-MM-DD HH:mm:ss"
            />
          </FormItem>

          <FormItem name="end_time">
            <DatePicker
              placeholder="请选择结束时间"
              format="YYYY-MM-DD HH:mm:ss"
            />
          </FormItem>

          <FormItem label="订单状态" name="status">
            <Select style={{ width: 100 }} placeholder="全部">
              <Option value="0">全部</Option>
              <Option value="1">进行中</Option>
              <Option value="2">行程结束</Option>
            </Select>
          </FormItem>

          <FormItem>
            <Button
              type="primary"
              style={{ margin: '0 20px' }}
              htmlType="submit"
            >
              查询
            </Button>
            <Button onClick={onReset}>重置</Button>
          </FormItem>
        </Form>
      </Card>
      <Card style={{ marginTop: 15 }}>
        <Button
          type="primary"
          style={{ marginRight: 15 }}
          onClick={orderDetail}
        >
          订单详情
        </Button>
        <Button type="primary" onClick={finishOrder}>
          结束订单
        </Button>
      </Card>

      <Card>
        <Table
          columns={columns}
          bordered
          rowSelection={rowSelection}
          dataSource={list}
        />
      </Card>
      <Modal
        title="结束订单"
        open={modal}
        onCancel={() => {
          setModal(false)
        }}
        onOk={colseOrder}
      >
        <Form layout="horizontal">
          <FormItem label="订单编号">{orderSn}</FormItem>
          <FormItem label="单车编号">{orderInfo.bike_sn}</FormItem>
          <FormItem label="行程开始时间">{orderInfo.start_time}</FormItem>
          <FormItem label="订单金额">￥{orderInfo.total_fee}元</FormItem>
          <FormItem label="当前位置">{orderInfo.location}元</FormItem>
        </Form>
      </Modal>
    </div>
  )
}
