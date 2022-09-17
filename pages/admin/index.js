import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/AdminLayout'
import MobileLayout from '../../components/MobileLayout'

export default function index () {
  const [showing, setShowing] = useState(false)

  useEffect(() => {
    setShowing(true)
  }, [])

  if (!showing) return null

  return (
    <MobileLayout>
      <AdminLayout/>
    </MobileLayout>
  )
}
