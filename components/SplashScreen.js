import React, { useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Logo from '../public/icon-512x512.png'

export default function SplashScreen () {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      // if (localStorage.getItem('user')) {
      //   router.push('/Main')
      // } else {
      //   if (localStorage.getItem('ya pasó por aquí')) {
      //     router.push('/SignIn')
      //   }
      //   router.push('/Onboarding')
      // }
      router.push('/SignIn')
    }, 1000)
  }, [])

  return (
    <div className={'h-screen flex items-center flex-col justify-center bg-[#5b211f]'}>
      <div className={'flex justify-center '}>
        <div
          className={'drop-shadow-2xl bg-white h-[260px] w-[260px] rounded-[50%] flex item-center justify-center animate-pulse'}>
          <div className={'h-[260px] w-[260px] rounded-[50%] flex items-center justify-center'}>
            <Image height={'200px'} width={'200px'} src={Logo} alt={'Rz Group'}/>
          </div>
        </div>
      </div>
    </div>
  )
}
