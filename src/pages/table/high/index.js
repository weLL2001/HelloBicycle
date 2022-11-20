import React, { useState, useEffect } from 'react'
import { Card, Table, Button, Modal, message } from 'antd'
import { getHighTable } from '../../../model/global'
export default function High() {
  const [user, setUser] = useState([])
  const [page, setPage] = useState({
    total_count: user.length,
    page_no: 1,
    page_size: 8
  })

  const getUser = async () => {
    try {
      const { data } = await getHighTable()
      setUser(data.user)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  const removeItem = id => {
    Modal.confirm({
      title: '确认删除',
      content: '确认有要删除这条数据吗？',
      onOk: () => {
        // 要传递后台，id =>到数据库里边去删除
        const newUser = user.filter(user => user.id !== id)
        setUser(newUser)
        message.success(`删除成功,${id}`)
      }
    })
  }

  // 表格的描述
  const columns = [
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
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: '操作',
      key: 'action',
      render: record => (
        <Button
          type="primary"
          onClick={() => {
            removeItem(record.id)
          }}
        >
          删除
        </Button>
      )
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
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      )
    }
  }

  return (
    <div>
      <Card title="头部固定" style={{ marginBottom: 15 }}>
        <Table
          bordered
          columns={columns}
          dataSource={user}
          pagination={false}
          // 表格是否固定，可以指定滚动区域的宽高
          scroll={{ y: 350 }}
        />
      </Card>

      <Card title="分页器" style={{ marginBottom: 15 }}>
        <Table
          bordered
          columns={columns}
          dataSource={user}
          pagination={{
            position: ['bottomLeft'],
            pageSize: page.page_size
          }}
        />
      </Card>

      <Card title="操作按钮">
        <Table
          bordered
          columns={columns}
          dataSource={user}
          pagination={{
            position: ['bottomLeft'],
            pageSize: page.page_size
          }}
          rowSelection={rowSelection}
          // 设置行属性 record当前的记录
          onRow={record => {
            return {
              onClick: () => {
                console.log(record)
              }
            }
          }}
        />
      </Card>
    </div>
  )
}
