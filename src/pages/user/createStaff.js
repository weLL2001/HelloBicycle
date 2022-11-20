import React, { forwardRef, useImperativeHandle } from 'react'
import { Form, Input, Radio, DatePicker } from 'antd'

const FormItem = Form.Item

function CreatStaff(props, ref) {
  const [form] = Form.useForm()
  useImperativeHandle(ref, () => ({
    form
  }))

  return (
    <div>
      <Form form={form}>
        {/* 用户名 */}
        <FormItem label="姓名" name="staff_name">
          <Input placeholder="请输入用户名"></Input>
        </FormItem>
        {/* 性别 */}
        <FormItem label="性别" name="staff_gender">
          <Radio.Group>
            <Radio value="1">男</Radio>
            <Radio value="2">女</Radio>
          </Radio.Group>
        </FormItem>
        {/* 籍贯 */}
        <FormItem label="籍贯" name="native_place">
          <Input placeholder="请输入籍贯"></Input>
        </FormItem>
        {/* 联系方式 */}
        <FormItem label="联系方式" name="mobile">
          <Input placeholder="请输入联系方式"></Input>
        </FormItem>
        {/* 入职时间 */}
        <FormItem label="入职时间" name="entry_time">
          <DatePicker placeholder="请选择入职时间" />
        </FormItem>
      </Form>
    </div>
  )
}

export default forwardRef(CreatStaff)
