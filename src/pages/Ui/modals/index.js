import React, { Component } from 'react'
import { Card, Button, Modal } from 'antd'

export default class JModal extends Component {
  constructor() {
    super()
    this.state = {
      showModal1: false,
      showModal2: false
    }
  }

  handleOpen = type => {
    this.setState({
      [type]: true
    })
  }

  render() {
    return (
      <div>
        {/* 基础对话框 */}
        <Card title="基础对话框" className="card-warp">
          <Button
            type="primary"
            onClick={() => {
              this.handleOpen('showModal1')
            }}
          >
            打开
          </Button>

          <Button
            type="primary"
            onClick={() => {
              this.handleOpen('showModal2')
            }}
          >
            打开
          </Button>
        </Card>

        {/* 对话框基础使用 */}
        <Modal
          title="react"
          open={this.state.showModal1}
          // 点击确定的回调
          onOk={() => {
            this.setState({
              showModal1: false
            })
          }}
          // 点击取消按钮的回调
          onCancel={() => {
            this.setState({
              showModal1: false
            })
          }}
        >
          <p>卷死你们</p>
        </Modal>
        <Modal
          title="张三"
          open={this.state.showModal2}
          okText="好的吧"
          cancelText="算了吧"
          style={{ top: 20 }}
          onOk={() => {
            this.setState({
              showModal2: false
            })
          }}
          // 点击取消按钮的回调
          onCancel={() => {
            this.setState({
              showModal2: false
            })
          }}
        >
          <p>我要卷死你们</p>
        </Modal>
      </div>
    )
  }
}
