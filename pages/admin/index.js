import React from 'react'
import AdminLayout from '../../components/AdminLayout'
import MobileLayout from '../../components/MobileLayout'
export default function index () {
  return (
    <MobileLayout>
      <AdminLayout/>
    </MobileLayout>
  )
}
