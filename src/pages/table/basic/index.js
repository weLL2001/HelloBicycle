import React, { useState, useEffect } from 'react'
import { Card, Table } from 'antd'
import { getTable } from '../../../model/global'
export default function Basic() {
  const [user, setUser] = useState([])

  // 获取数据
  const getUser = async () => {
    try {
      const data = await getTable()
      console.log(data.user)
      setUser(data.user)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  // 模拟数据 数据源
  const dataSource = []
  for (let i = 0; i <= 50; i++) {
    dataSource.push({
      key: i,
      name: `张三${i}`,
      age: `${i}岁`,
      address: `东湖区第${i}号`
    })
  }

  // 表格的格式 表格列的配置描述
  const columns = [
    {
      title: '姓名',
      // 在数据中对应的
      dataIndex: 'name',
      width: 120,
      key: 'name'
    },
    {
      title: '年龄',
      dataIndex: 'age',
      width: 80,
      key: 'age'
    },
    {
      title: '地址',
      dataIndex: 'address',
      width: 300,
      key: 'address'
    }
  ]

  // 表格的描述
  const userColumns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: '性别',
      dataIndex: 'isMale',
      key: 'isMale',
      // 生成复杂的数据渲染的函数
      render(isMale) {
        return isMale === true ? '男' : '女'
      }
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: '联系方式',
      dataIndex: 'phone',
      key: 'phone'
    }
  ]
  return (
    <div>
      <Card title="基础表格" style={{ marginBottom: 15 }}>
        <Table dataSource={dataSource} columns={columns} />
      </Card>

      <Card title="动态渲染">
        <Table dataSource={user} columns={userColumns} />
      </Card>
    </div>
  )
}
