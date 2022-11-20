import React, { useState, useRef } from 'react'
import { Card, Button, Modal } from 'antd'

import FilterForm from './FilterForm'
import OpenCityForm from './OpenCityForm'
import CityList from './CityList'

export default function City() {
  const [modal, setModal] = useState(false)

  const cityRefs = useRef()

  const addCity = () => {
    setModal(true)
  }

  const getData = () => {
    // 将这些值传给后台接口，后台接口根据传入的条件去查询，之后返回对应的数据
    console.log(cityRefs.current.formFields.getFieldsValue())
    setModal(false)
  }

  return (
    <div style={{ width: '100%' }}>
      <Card>
        <FilterForm />
      </Card>
      <Card style={{ marginTop: 15 }}>
        <Button type="primary" onClick={addCity} style={{ marginBottom: 15 }}>
          开通城市
        </Button>
        <CityList />
      </Card>

      <Modal
        title="开通城市"
        open={modal}
        onCancel={() => {
          setModal(false)
        }}
        onOk={getData}
      >
        <OpenCityForm ref={cityRefs} />
      </Modal>
    </div>
  )
}
