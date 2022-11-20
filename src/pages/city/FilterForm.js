import { Button, Form, Select } from 'antd'
import React from 'react'
const FormItem = Form.Item
const Option = Select.Option

export default function FilterForm() {
  const [form] = Form.useForm()

  const getData = values => {
    // 作为查询条件 发送给后台
    console.log(values)
  }

  // 重置表单
  const onReset = () => {
    form.resetFields()
  }

  return (
    <div>
      {/* form 表单的控制实例 */}
      <Form layout="inline" onFinish={getData} form={form}>
        <FormItem label="城市" name="city_id">
          <Select style={{ width: 100 }} placeholder="全部">
            <Option value="">全部</Option>
            <Option value="1">北京市</Option>
            <Option value="2">天津市</Option>
            <Option value="3">深圳市</Option>
            <Option value="4">武汉市</Option>
          </Select>
        </FormItem>

        <FormItem label="用车模式" name="mode_id">
          <Select style={{ width: 100 }} placeholder="全部">
            <Option value="">全部</Option>
            <Option value="1">指定停车点模式</Option>
            <Option value="2">禁停区模式</Option>
          </Select>
        </FormItem>

        <FormItem label="营运模式" name="op_mode">
          <Select style={{ width: 100 }} placeholder="全部">
            <Option value="">全部</Option>
            <Option value="1">自营</Option>
            <Option value="2">加盟</Option>
          </Select>
        </FormItem>

        <FormItem label="授权状态" name="status">
          <Select style={{ width: 100 }} placeholder="全部">
            <Option value="">全部</Option>
            <Option value="1">已授权</Option>
            <Option value="2">未授权</Option>
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
