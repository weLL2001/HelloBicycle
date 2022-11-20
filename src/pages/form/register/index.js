import { Card, Form, Input, Button, Cascader, Select } from 'antd'
import React from 'react'
const FromItem = Form.Item

export default function Register() {
  const onFinish = values => {
    console.log(values)
  }

  return (
    <Card>
      <Form
        name="register"
        style={{ width: 350 }}
        initialValues={{
          // 初始值
          address: ['湖北', '武汉', '东湖高新区'],
          prifix: 'male'
        }}
        onFinish={onFinish}
      >
        <FromItem
          label="注册"
          name="email"
          rules={[
            {
              required: true,
              message: '请输入你的邮箱地址'
            },
            {
              type: 'email',
              message: '用户名不合法'
            }
          ]}
        >
          <Input />
        </FromItem>

        {/* 密码 */}
        <FromItem
          label="密码"
          // 展示校验状态的图标
          hasFeedback
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码'
            }
          ]}
        >
          <Input.Password />
        </FromItem>

        {/* 确认密码 */}
        <FromItem
          label="确认密码"
          // 展示校验状态的图标
          hasFeedback
          name="confirmpassword"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: '请确认你的密码'
            },
            //
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject('两次输入的密码不一致')
              }
            })
          ]}
          // 当字段之间存在依赖关系的时候，如果一个字段设置了dependencies，他所依赖的字段更新的时候，会自动地触发更新与校验
        >
          <Input.Password />
        </FromItem>

        {/* 级联菜单 */}
        <FromItem
          label="地址"
          name="address"
          rules={[
            {
              type: 'array',
              required: true,
              message: '请选择地址'
            }
          ]}
        >
          {/* 级联菜单 */}
          <Cascader
            options={[
              {
                value: '湖北',
                label: '湖北',
                children: [
                  {
                    value: '武汉',
                    label: '武汉',
                    children: [
                      {
                        value: '东湖高新区',
                        label: '东湖高新区'
                      }
                    ]
                  }
                ]
              },
              {
                value: '湖南',
                label: ' 湖南',
                children: [
                  {
                    value: '长沙',
                    label: '长沙',
                    children: [
                      {
                        value: '岳麓区',
                        label: '岳麓区'
                      }
                    ]
                  }
                ]
              }
            ]}
          ></Cascader>
        </FromItem>

        {/* 下拉菜单 */}
        <FromItem label="性别" name="prifix">
          <Select>
            <Select.Option value="male">男</Select.Option>
            <Select.Option value="female">女</Select.Option>
            <Select.Option value="other">保密</Select.Option>
          </Select>
        </FromItem>

        <FromItem>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </FromItem>
      </Form>
    </Card>
  )
}
