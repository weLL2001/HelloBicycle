import React, { useEffect, useState } from 'react'
import { getOpenCity } from '../../model/city'
import { Table } from 'antd'

import moment from 'moment'
// 引入中文
import 'moment/locale/zh-cn'
// 设置中文
moment.locale('zh-cn')

export default function CityList() {
  const [cityList, setCityList] = useState([])

  const getCity = async () => {
    try {
      const { data } = await getOpenCity()
      console.log(data)
      // 添加一个唯一的key
      setCityList(
        data.item_list.map((item, index) => {
          item.key = index
          return item
        })
      )
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    getCity()
  }, [])

  // 描述表格
  const columns = [
    {
      title: '城市ID',
      dataIndex: 'id'
    },
    {
      title: '城市名称',
      dataIndex: 'name'
    },
    {
      title: '用车模式',
      dataIndex: 'mode',
      render(mode) {
        return mode === 1 ? '停车点' : '禁停区'
      }
    },
    {
      title: '营运模式',
      dataIndex: 'op_mode',
      render(op_mode) {
        return op_mode === 1 ? '自营' : '加盟'
      }
    },
    {
      title: '授权加盟商',
      dataIndex: 'franchisee_name'
    },
    {
      title: '城市管理员',
      dataIndex: 'city_admins',
      render(arr) {
        return arr
          .map(item => {
            return item.user_name
          })
          .join(',')
      }
    },
    {
      title: '城市开通时间',
      dataIndex: 'open_time'
    },
    {
      title: '操作时间',
      dataIndex: 'update_time',
      render(update_time) {
        return moment.unix(update_time).format('dddd h:mm:ss')
      }
    },
    {
      title: '操作人',
      dataIndex: 'sys_user_name'
    }
  ]

  return (
    <div>
      <Table
        bordered
        dataSource={cityList}
        columns={columns}
        pagination={{
          pageSize: 12
        }}
      />
    </div>
  )
}
