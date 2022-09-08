import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { StopIcon } from '@heroicons/react/24/solid'

import MobileLayout from '../components/MobileLayout'
import image1 from '../public/Images/OnBoarding-1.svg'
import image2 from '../public/Images/OnBoarding-2.svg'
import image3 from '../public/Images/OnBoarding-3.svg'

export default function Onboarding () {
  const router = useRouter()
  const [tab, setTab] = useState(1)

  // need a function to change tabs automatically after 5 seconds and when tab === 3, it should return the value to 1 and start again
  useEffect(() => {
    const interval = setInterval(() => {
      if (tab === 3) {
        setTab(1)
      } else {
        setTab(tab + 1)
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [tab])

  return (
    <MobileLayout>
      <div className={'md:shadow-2xl bg-[#F7F8FA] h-screen flex items-center flex-col'}>
        <div className={'h-1/2 flex justify-center'}>
          {tab === 1 && <Image width={'274px'} height={'287px'} src={image1} alt="hero" className={'w-3/4 '}/>}
          {tab === 2 && <Image width={'274px'} height={'287px'} src={image2} alt="hero" className={'w-3/4 '}/>}
          {tab === 3 && <Image width={'274px'} height={'287px'} src={image3} alt="hero" className={'w-3/4 '}/>}
        </div>
        <div
          className={'bg-gradient-to-b from-red-700 to-[#5b211f] rounded-t-3xl mt-5 p-5 h-[375px] flex-grow flex-col items-center justify-center'}>
          <div>
            <h2 className={'text-white font-bold text-2xl text-center m-5'}> Welcome to Rz Group</h2>
            {tab === 1 &&
              <h2 className={'text-white text-xl text-center m-5'}>We have exclusive transportation in cities such as:
                Bogotá, Medellín, Cali, Cartagena among others.</h2>}
            {tab === 2 &&
              <h2 className={'text-white text-xl text-center m-5'}>Our service is door to door
                (airport-hotel-hotel-airport) and is based on respect, punctuality and safety.</h2>}
            {tab === 3 &&
              <h2 className={'text-white text-xl text-center m-5'}>We offer service for hours or full day according to
                the requirement of our client.</h2>}

          </div>
          <div className={'w-full'}>
            <button onClick={() => router.push('/SignIn')}
                    className={'w-full rounded-[25px] h-[50px] text-white bg-[#000000]'}>Get Started
            </button>
          </div>
          <div className={'flex justify-center mt-10'}>
            {tab === 1
              ? <StopIcon className={'h-5 w-5 text-[#000000]'}/>
              : <StopIcon className={'text-[#f1f2f6] w-5 h-5'}/>}
            {tab === 2
              ? <StopIcon className={'h-5 w-5 text-[#000000]'}/>
              : <StopIcon className={'text-[#f1f2f6] w-5 h-5'}/>}
            {tab === 3
              ? <StopIcon className={'h-5 w-5 text-[#000000]'}/>
              : <StopIcon className={'text-[#f1f2f6] w-5 h-5'}/>}
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}
