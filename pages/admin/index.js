import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/AdminLayout'
import MobileLayout from '../../components/MobileLayout'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

export default function index () {
  const [showing, setShowing] = useState(false)
  const { user } = useSelector(state => state)
  const router = useRouter()
  useEffect(() => {
    setShowing(true)
  }, [])

  if (!showing) return null
  if (user.roles !== 'admin') router.push('/')
  return (
    <MobileLayout>
      <AdminLayout/>
    </MobileLayout>
  )
}
