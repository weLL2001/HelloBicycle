import React from 'react'

import { Card, Button, message } from 'antd'

export default function Message() {
  const showMessage = type => {
    message[type]('你的BUG太多了，请到财务去交罚款，每个BUG 200块')
  }

  return (
    <div>
      <Card title="全局提示框" className="card-wrap">
        <Button type="primary" onClick={() => showMessage('success')}>
          success
        </Button>

        <Button type="primary" onClick={() => showMessage('info')}>
          info
        </Button>

        <Button type="primary" onClick={() => showMessage('warning')}>
          warning
        </Button>

        <Button type="primary" onClick={() => showMessage('error')}>
          error
        </Button>

        <Button type="primary" onClick={() => showMessage('loading')}>
          loading
        </Button>
      </Card>
    </div>
  )
}
