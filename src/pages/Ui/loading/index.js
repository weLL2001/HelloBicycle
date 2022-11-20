import React, { Component } from 'react'
import { Card, Spin, Alert, Button } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

// spin用于页面和区块的加载状态
export default class Loading extends Component {
  constructor() {
    super()
    this.state = {
      dispaly: true
    }
  }

  render() {
    return (
      <div>
        {/* 基础使用 */}
        <Card title="Spin的基础使用" className="card-wrap">
          <Spin size="small" spinning={this.state.dispaly}></Spin>
          <Spin
            size="default"
            spinning={this.state.dispaly}
            style={{ margin: '0 15px' }}
          ></Spin>
          <Spin size="large" spinning={this.state.dispaly}></Spin>
          <Spin
            indicator={<LoadingOutlined />}
            style={{ marginLeft: '10px' }}
            spinning={this.state.dispaly}
          ></Spin>
        </Card>

        {/* 内容遮罩 */}

        <Card title="内容遮罩">
          {/*  Alert 基础使用*/}
          <Alert
            message="张三"
            description="吃饭睡觉打豆豆"
            type="info"
            closable
            style={{ marginBottom: '10px' }}
          />

          <Spin spinning={this.state.dispaly}>
            <Alert
              message="张三"
              description="吃饭睡觉打豆豆"
              type="success"
              closable
              style={{ marginBottom: '10px' }}
            />
          </Spin>

          <Spin spinning={this.state.dispaly} tip="加载中...">
            <Alert
              message="张三"
              description="吃饭睡觉打豆豆"
              type="warning"
              closable
              
            />
          </Spin>

          <Button type="primary" onClick={this.setDisplay}>
            {this.state.dispaly ? '加载完毕' : 'Loading...'}
          </Button>
        </Card>
      </div>
    )
  }

  setDisplay = () => {
    this.setState({
      dispaly: !this.state.dispaly
    })
  }
}
