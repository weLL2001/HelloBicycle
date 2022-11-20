import React, { useState, useEffect, useRef } from 'react'
import { Button, Card, Form, Input, Select, Table, Modal } from 'antd'
import {
  DeleteFilled,
  EditFilled,
  PlusOutlined,
  UnorderedListOutlined
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { uniqueKey } from '../../utils/utils'
import moment from 'moment'

import CreatStaff from './createStaff'
import {getStaffList,addStaff,getStaffStatus,deleteStaff} from '../../model/staff'

const FormItem = Form.Item
const Option = Select.Option

export default function User() {
  const [form] = Form.useForm()
  const navgite = useNavigate()
  const [staffList, setStaffList] = useState([])
  const [staffStatusList, setStaffStatusList] = useState([])
  const [IsModalOpen, setIsModalOpen] = useState(false)
  const [staffId, setStaffId] = useState(0)

  const createRef = useRef()
  // 获取员工列表
  const getStaffListData = async () => {
    try {
      const { data } = await getStaffList()
      setStaffList(uniqueKey(data.item_list))
    } catch (error) {
      throw new Error(error)
    }
  }

  // 获取员工状态列表
  const getStaffStatusList = async () => {
    try {
      const { data } = await getStaffStatus()
      setStaffStatusList(data)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    getStaffListData()
  }, [])

  useEffect(() => {
    getStaffStatusList()
  }, [])

  const columns = [
    {
      title: 'id',
      dataIndex: 'id'
    },
    {
      title: '员工姓名',
      dataIndex: 'staff_name'
    },
    {
      title: '性别',
      dataIndex: 'staff_gender',
      render(staff_gender) {
        return staff_gender === 1 ? '男' : '女'
      }
    },
    {
      title: '状态',
      dataIndex: 'staff_status',
      render(staff_status) {
        return {
          1: '在职',
          2: '事假',
          3: '病假',
          4: '产假',
          5: '年假',
          6: '离职'
        }[staff_status]
      }
    },
    {
      title: '基本工资',
      dataIndex: 'staff_salary'
    },
    {
      title: '联系方式',
      dataIndex: 'phone'
    },
    {
      title: '籍贯',
      dataIndex: 'native_place'
    },
    {
      title: '入职时间',
      dataIndex: 'entry_time'
    }
  ]
  const getData = value => {
    // 提交给后台接口
    console.log(value)
  }

  const handleOperate = type => {
    if (type === 'create') {
      // console.log('新增员工')
      // 中断条件
      return setIsModalOpen(true)
    }

    if (type === 'delete') {
      if (staffId === 0) {
        return Modal.error({
          title: '请选择要删除的员工'
        })
      }

      return Modal.confirm({
        title: '确认删除员工',
        content: `是否要删除选中的员工${staffId}`,

        onOk() {
          deleteStaff()
        }
      })
    }

    if (type === 'detail') {
      if (staffId === 0) {
        return Modal.error({
          title: '请选择员工'
        })
      }

      navgite(`/user/detail/${staffId}`)
    }
  }
  // 删除员工
  const deleteStaff = async () => {
    const { data } = deleteStaff({ staffId })
    if (data.code === 200) {
      Modal.success({
        content: data.message
      })
      getStaffList()
      setStaffId(0)
    }
  }
  // 增加员工
  const addStaff = async () => {
    // console.log(createRef.current.form.getFieldsValue())
    const { staff_name, staff_gender, native_place, mobile, entry_time } =
      createRef.current.form.getFieldsValue()
    const time = moment(entry_time).format('X')
    // console.log(staff_name,staff_gender,native_place,mobile,time)
    const { data } = addStaff({ staff_name, staff_gender, native_place, mobile, time })
    if (data.code === 200) {
      Modal.success({
        title: data.message
      })
      // 重新请求数据
      getStaffList()
      // 对话框清空
      setIsModalOpen(false)
      // 清除表单
      createRef.current.form.resetFields()
    }
  }

  const rowSelection = {
    type: 'radio',
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(selectedRowKeys, selectedRows)
      setStaffId(selectedRowKeys)
    }
  }

  return (
    <div style={{ width: '100%' }}>
      <Card>
        <Form layout="inline" form={form} onFinish={getData}>
          <FormItem
            label="请输入员工姓名"
            name="staff_name"
            // 校验规则
            rules={[
              {
                required: true,
                message: '请输入员工姓名'
              }
            ]}
          >
            <Input placeholder="请输入员工姓名" style={{ width: 180 }} />
          </FormItem>

          <FormItem label="请选择员工状态" name="staffStatus">
            <Select
              style={{ width: 180 }}
              placeholder="请选择员工状态"
              options={staffStatusList.map((item, index) => ({
                label: item,
                value: index
              }))}
            ></Select>
          </FormItem>

          <FormItem>
            <Button
              type="primary"
              style={{ margin: '0 20px' }}
              htmlType="submit"
            >
              查询
            </Button>
            <Button
              onClick={() => {
                form.resetFields()
              }}
            >
              重置
            </Button>
          </FormItem>
        </Form>
      </Card>
      <Card style={{ marginTop: 15 }}>
        <Button
          type="primary"
          style={{ marginRight: 15 }}
          icon={<PlusOutlined />}
          onClick={() => {
            handleOperate('create')
          }}
        >
          新增员工
        </Button>
        <Button
          type="primary"
          style={{ marginRight: 15 }}
          icon={<DeleteFilled />}
          onClick={() => {
            handleOperate('delete')
          }}
        >
          删除员工
        </Button>
        <Button
          type="primary"
          style={{ marginRight: 15 }}
          icon={<UnorderedListOutlined />}
          onClick={() => {
            handleOperate('detail')
          }}
        >
          员工详情
        </Button>
        <Button
          type="primary"
          icon={<EditFilled />}
          onClick={() => {
            handleOperate('edit')
          }}
        >
          编辑员工信息
        </Button>
      </Card>

      <Card>
        <Table
          columns={columns}
          bordered
          dataSource={staffList}
          rowSelection={rowSelection}
        />
      </Card>
      <Modal
        title="新增员工"
        open={IsModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={addStaff}
      >
        <CreatStaff ref={createRef} />
      </Modal>
    </div>
  )
}
