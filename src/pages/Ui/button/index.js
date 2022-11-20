import React, { useState } from 'react'
import { Button, Card, Dropdown, Menu, Radio, Space } from 'antd'
import {
    DeleteOutlined, EditOutlined, LeftOutlined, PlusOutlined, RightOutlined, SearchOutlined
} from '@ant-design/icons'
import './index.less'
export default function Ibutton() {
    const [loading, setLoading] = useState(true)
    const [size, setSize] = useState('middle')
    const loadingClose = () => {
        setLoading(false)
      }
    
      const change = e => {
        setSize(e.target.value)
      }
    
      const menu = (
        <Menu
          items={[
            {
              key: 1,
              label: 'item1'
            },
            {
              key: 2,
              label: 'item2'
            },
            {
              key: 3,
              label: 'item3'
            }
          ]}
        ></Menu>
      )
    return (
        <div>
      {/* 卡片组件，最基本的卡片容器 */}
      <Card title="基础按钮" className="card-warp">
        {/* type设置按钮类型 */}
        <Button type="primary">金渡</Button>
        <Button>金渡</Button>
        <Button type="dashed">金渡</Button>
        <Button danger type="primary">
          金渡
        </Button>
        <Button disabled>金渡</Button>
      </Card>

      <Card title="图形按钮" className="card-warp">
        <Button icon={<PlusOutlined />}>金渡</Button>
        <Button icon={<EditOutlined />}>金渡</Button>
        <Button icon={<DeleteOutlined />}>金渡</Button>
        <Button
          shape="circle"
          icon={<SearchOutlined />}
          type="primary"
        ></Button>
      </Card>

      {/* 添加一个loading属性 */}
      <Card title="Loading按钮" className="card-warp">
        <Button type="primary" loading={loading}>
          确定
        </Button>
        <Button shape="circle" loading={loading} type="primary"></Button>
        <Button type="primary" onClick={loadingClose}>
          关闭
        </Button>
      </Card>

      <Card title="按钮组">
        {/* Space组件，避免使组件贴在一起 拉开统一的空间*/}
        <Space>
          <Button type="primary" icon={<LeftOutlined />}>
            返回
          </Button>
          <Button type="primary" icon={<RightOutlined />}>
            前进
          </Button>
          {/* 按钮组，推荐使用1个主要的，N个次操作，如果超过了3个以上，我们可以采用下拉菜单 */}
          {/* overlay属性去设置下拉菜单 */}
          <Dropdown.Button overlay={menu}>更多</Dropdown.Button>
        </Space>
      </Card>

      <Card
        title="按钮尺寸"
        className="card-warp"
        style={{
          marginTop: '10px'
        }}
      >
        {/* 单选框 */}
        <Radio.Group
          value={size}
          onChange={e => {
            change(e)
          }}
        >
          <Radio value="small">小</Radio>
          <Radio value="middle">中</Radio>
          <Radio value="large">大</Radio>
        </Radio.Group>

        <Button type="primary" size={size}>
          金渡
        </Button>
      </Card>
    </div>
    )
}
