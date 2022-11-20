import React from 'react'
import { useParams } from 'react-router-dom'

export default function UserDetail() {
  const { id } = useParams()
  return (
    <div>
      UserDetail
      <h1>{id}</h1>
    </div>
  )
}

/* 
id 去数据库里边查询
就是去请求接口
*/