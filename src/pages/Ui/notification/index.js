import React from 'react'
import { Card, Button, notification } from 'antd'

export default function Notification() {
  const openNotification = (type, direction) => {
    if (direction) {
      notification.config({
        placement: direction
      })
    }

    notification[type]({
      message: '本月你提交了20个BUG',
      description: '扣完你的工资'
    })
  }

  return (
    <div>
      <Card title="通知提醒框" className="card-wrap">
        <Button type="primary" onClick={() => openNotification('success')}>
          Success
        </Button>

        <Button type="primary" onClick={() => openNotification('info')}>
          Info
        </Button>

        <Button type="primary" onClick={() => openNotification('warning')}>
          Warning
        </Button>

        <Button type="primary" onClick={() => openNotification('error')}>
          Error
        </Button>
      </Card>

      <Card title="通知提醒框" className="card-wrap" style={{ marginTop: 10 }}>
        <Button type="primary" onClick={() => openNotification('success','topLeft')}>
          Success
        </Button>

        <Button type="primary" onClick={() => openNotification('info','topRight')}>
          Info
        </Button>
      </Card>
    </div>
  )
}
