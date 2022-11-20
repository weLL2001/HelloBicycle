import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Card, Form, Input, Button } from 'antd'

export default function Login() {
  const getData = values => {
    console.log(values)
  }

  return (
    <div>
      <Card title="行内表单">
        {/* layout 表单布局 */}
        <Form layout="inline">
          {/* 表单的字段组件 */}
          <Form.Item
            // 字段名
            name="username"
            // 校验规则
            rules={[
              {
                required: true,
                message: '请输入用户名'
              }
            ]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码'
              }
            ]}
          >
            {/* 密码 */}
            <Input.Password placeholder="请输入密码" />
          </Form.Item>

          <Form.Item>
            {/* htmlType设置 button 原生的 type 值 */}
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title="水平登录表单" style={{ marginTop: 10 }}>
        {/* 表单的名称 */}
        <Form
          style={{ width: 350 }}
          name="login"
          // 可以获取登录的信息
          onFinish={getData}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名'
              },
              {
                //  数字，字母 _ 正则去匹配
                pattern: /\w+/,
                message: '用户名不合法'
              }
            ]}
          >
            {/* prefix带有图标的input */}
            <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码'
              },
              {
                min: 5,
                max: 12,
                message: '请检查密码的健壮性'
              }
            ]}
          >
            <Input.Password
              placeholder="请输入密码"
              prefix={<LockOutlined />}
            />
          </Form.Item>
          <Form.Item>
            {/* htmlType设置 button 原生的 type 值 */}
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
