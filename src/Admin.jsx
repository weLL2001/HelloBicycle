import React from 'react'
import Header from '@/header'
import Footer from './components/footer'
import Naviator from './components/naviator'
import Home from './pages/home'
import { Row, Col } from 'antd'
import './Admin.less'
export default function Admin() {
  return (
    <div className="warpper">
    {/* 建立row */}
    <Row>
      <Col span="4" className="warpper__left">
        <Naviator />
      </Col>

      <Col span="20" className="warpper__right">
        {/* 右边头部 */}
        <Header />
        <Row className="warpper__right__content">
          <Home />
        </Row>
        <Footer />
      </Col>
    </Row>
  </div>
  )
}
