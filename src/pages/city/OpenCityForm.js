import { Form, Select } from 'antd'
import React, { useImperativeHandle, forwardRef } from 'react'
const FormItem = Form.Item
const Option = Select.Option

function OpenCityForm(props, ref) {
  const [form] = Form.useForm()
  useImperativeHandle(ref, () => ({
    formFields: form
  }))

  return (
    <Form
      layout="horizontal"
      initialValues={{
        city_id: '北京',
        mode_id: '自营',
        op_mode: '指定停车点'
      }}
      // 获取表单实例
      form={form}
    >
      <FormItem label="选择城市" name="city_id">
        <Select style={{ width: 200 }}>
          <Option value="">全部</Option>
          <Option value="1">北京市</Option>
          <Option value="2">天津市</Option>
          <Option value="3">深圳市</Option>
          <Option value="4">武汉市</Option>
        </Select>
      </FormItem>

      <FormItem label="用车模式" name="mode_id">
        <Select style={{ width: 200 }}>
          <Option value="">全部</Option>
          <Option value="1">指定停车点模式</Option>
          <Option value="2">禁停区模式</Option>
        </Select>
      </FormItem>

      <FormItem label="营运模式" name="op_mode">
        <Select style={{ width: 200 }}>
          <Option value="">全部</Option>
          <Option value="1">自营</Option>
          <Option value="2">加盟</Option>
        </Select>
      </FormItem>
    </Form>
  )
}

export default forwardRef(OpenCityForm)
