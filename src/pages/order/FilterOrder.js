import { Button, Form, Select, DatePicker } from 'antd'
import React from 'react'
import moment from 'moment'

import { useDispatch } from 'react-redux'
import { orderListFilter } from '../../store/orderSlice'

const FormItem = Form.Item
const Option = Select.Option

export default function FilterForm() {
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const getData = async values => {
    // // 作为查询条件 发送给后台
    // const { start_time, end_time, status } = values
    // // 获取当前时间戳 时间戳传递给后台  Unix 时间戳是从1970年1月1日（UTC/GMT的午夜）开始所经过的秒数 X 返回的是经过的秒数
    // const start = moment(start_time).format('X')
    // const end = moment(end_time).format('X')
    // const params = { start, end, status }

    // const { data } = await request({
    //   method: 'get',
    //   url: '/order_filter',
    //   params
    // })
    // console.log(data)
    dispatch(orderListFilter())
  }
  // 重置表单
  const onReset = () => {
    form.resetFields()
  }

  return (
    <div>
      {/* form 表单的控制实例 */}
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
          <Button type="primary" style={{ margin: '0 20px' }} htmlType="submit">
            查询
          </Button>
          <Button onClick={onReset}>重置</Button>
        </FormItem>
      </Form>
    </div>
  )
}
