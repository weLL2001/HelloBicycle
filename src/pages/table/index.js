import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Tables() {
  return (
    <div style={{ width: '100%' }}>
      <Outlet />
    </div>
  )
}
