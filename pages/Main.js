import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import MobileLayout from '../components/MobileLayout'
import { useSelector } from 'react-redux'
import DriverLayout from '../components/DriverLayout'
import RiderLayout from '../components/RiderLayout'
import AdminLayout from '../components/AdminLayout'
import Validation from './Validation'

export default function Main () {
  const router = useRouter()
  const { user } = useSelector(state => state)

  useEffect(() => {
    if (user?.accessToken) {
      console.log(user)
    } else {
      router.push('/SignIn')
    }
  }, [user])

  return (
    <MobileLayout>
      {user.roles === 'driver' &&
        user.isAproved
        ? <DriverLayout/>
        : <Validation/>
      }
      {user.roles === 'client' &&
        <RiderLayout/>
      }
      {
        user.roles === 'admin' &&
        <AdminLayout/>
      }
    </MobileLayout>
  )
}
