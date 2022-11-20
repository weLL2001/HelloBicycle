import React, { useState } from 'react'
import { Card, Row, Col, Modal } from 'antd'
const { Meta } = Card

export default function Gallery() {
  const [visable, setVisable] = useState(false)
  const [url, setUrl] = useState()

  // 二维数组
  const imgs = [
    ['1.png', '2.png', '3.png', '4.png', '5.png'],
    ['6.png', '7.png', '8.png', '9.png', '10.png'],
    ['11.png', '12.png', '13.png', '14.png', '15.png'],
    ['16.png', '17.png', '18.png', '19.png', '20.png'],
    ['21.png', '22.png', '23.png', '24.png', '25.png']
  ]

  const openImg = imgsrc => {
    // 修改状态是否可见
    setVisable(true)
    // 修改图片的地址
    setUrl(`/gallery/${imgsrc}`)
    console.log(url)
  }

  const imgList = imgs.map(list =>
    // 二维数组
    list.map(item => (
      <Card
        style={{ marginBottom: 10 }}
        // 卡片封面
        cover={<img src={`/gallery/${item}`} alt={`/gallery/${item}`} />}
        key={item}
        onClick={() => {
          openImg(item)
        }}
      >
        <Meta title="金渡教育后台管理系统" description="金渡教育" />
      </Card>
    ))
  )

  return (
    <div className="card-wrap">
      {/* gutter表示栅格之间的距离  md 设置水平间隔*/}
      {/* 
        row =>行
        col => 列
      */}
      <Row gutter={10}>
        <Col md={5}>{imgList[0]}</Col>
        <Col md={5}>{imgList[1]}</Col>
        <Col md={5}>{imgList[2]}</Col>
        <Col md={5}>{imgList[3]}</Col>
        <Col md={4}>{imgList[4]}</Col>
      </Row>
      <Modal
        width={300}
        height={500}
        // 对话框是否可见
        open={visable}
        // 自定义页脚
        footer={null}
        // 关闭后的回调
        title="图片画廊"
        onCancel={() => {
          setVisable(false)
        }}
      >
        <img src={url} alt="" style={{ width: '100%' }} />
      </Modal>
    </div>
  )
}
