import React, { useEffect, useState } from 'react'
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
  const [showing, setShowing] = useState(false)
  useEffect(() => {
    if (user?.accessToken) {
      console.log(user)
    } else {
      router.push('/SignIn')
    }
  }, [user])

  useEffect(() => {
    setShowing(true)
  }, [])

  if (!showing) return null
  else {
    return (
      <>
        {
          user?.role === 'admin' && user.isAproved === 'Aproved'
            ? <MobileLayout>
              <AdminLayout/>
            </MobileLayout>
            : null
        }
        {
          user?.roles === 'driver' && user.isAproved === 'Aproved'
            ? <MobileLayout>
              <DriverLayout/>
            </MobileLayout>
            : user?.roles === 'driver' && user.isAproved === 'notAproved' &&
            <MobileLayout>
              <Validation/>
            </MobileLayout>
        }
        {
          user?.roles === 'rider'
            ? <MobileLayout>
              <RiderLayout/>
            </MobileLayout>
            : null
        }
      </>
    )
  }
}
