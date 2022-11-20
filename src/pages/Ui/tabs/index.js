import React, { useRef, useState } from 'react'
import { Tabs, Card } from 'antd'

// 数据库
const initItems = [
  {
    label: '选项卡一',
    children: '选项卡一的内容',
    key: '1'
  },
  {
    label: '选项卡二',
    children: '选项卡二的内容',
    key: '2'
  },
  {
    label: '选项卡三',
    children: '选项卡三的内容',
    key: '3',
    // 禁止关闭
    closable:false
  }
]

export default function Tab() {
  const [activeKey, setActivekey] = useState(initItems[0].key)
  const [items, setItems] = useState(initItems)
  /* 
  1.获取当前的DOM元素
  2.存数据 组件不被销毁的话，这个原始对象就会一直存在，我们可以利用这个特性：
  useRef来保存一些数据
  
  */
  const newTabIndex = useRef(0)

  // 参数：是当前激活的key
  const onchange = newActiveKey => {
    setActivekey(newActiveKey)
  }

  // 增加
  const add = () => {
    // 保证key的唯一性，key是动态生成的，从0开始累加
    const newActiveKey = `tabs${newTabIndex.current++}`
    const newPanes = [...items]
    // 插入数据 生成新的面板
    newPanes.push({
      label: `选项卡${newActiveKey}`,
      children: `选项卡${newActiveKey}的内容`,
      key: newActiveKey
    })

    setItems(newPanes)
    setActivekey(newActiveKey)
  }


  /* 
  1.targetKey 需要删除的标签页的key 目标：key
  2.activekey 当前打开的页签的key
  有可能存在的问题：打开的标签页的key 有可能和删除的key不是同一个
  打开的是第一个，但是我删除的是最后一个
  */
 
  const remove = targetKey => {
    // 获取当前的打开的标签key
    let newActiveKey = activeKey
    // 生成一个索引(这个索引保存的是当前需要激活的key,删除当前的key,激活的key应该是被删除的key的前一个)
    let lastIndex
    // 要删除的key和当前的key是同一个的话
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1
      }
    })

    // 过滤掉删除的标签页
    const newPanes = items.filter(item => item.key !== targetKey)

    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key
      } else {
        newActiveKey = newPanes[0].key
      }
    }
    
    setItems(newPanes)
    setActivekey(newActiveKey)
  }

  const onEdit = (targetKey, action) => {
    if (action === 'add') {
      add()
    } else {
      remove(targetKey)
    }
  }

  return (
    <div>
      <Card title="标签页的基础使用">
        <Tabs type="card" items={items} defaultActiveKey="2"></Tabs>
      </Card>

      <Card title="Tabs标签页" style={{ marginTop: 10 }}>
        <Tabs
          // 标签页的样式 line,card,editable-card
          type="editable-card"
          // 当前激活的tab面板的key
          activeKey={activeKey}
          // 配置选项卡的内容
          items={items}
          onChange={onchange}
          // 	新增和删除页签的回调
          onEdit={onEdit}
        ></Tabs>
      </Card>
    </div>
  )
}
