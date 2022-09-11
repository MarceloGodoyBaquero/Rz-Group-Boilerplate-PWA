import React from 'react'
import Image from 'next/image'
import MobileLayout from '../components/MobileLayout'
import Nav from '../components/Nav'
import defaultImage from '../public/Images/fakeimg.png'
import { ChevronRightIcon } from '@heroicons/react/24/solid'

function ProfileMobile () {
  return (
    <MobileLayout>
    <div className="md:shadow-2xl  bg-white  h-screen">
     <Nav location={'Profile'} cosito={true} className={'w-screen'}/>
      <div className="bg-gray-50 mt-2 p-4 ">
        <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-xl p-4">
          <Image
            className="w-20 h-20 rounded-full"
            src={defaultImage}
            width={'100%'}
            height={'100%'}
            alt="Rounded avatar"
          />
          <div className="flex-1 mt-4">
            <h1 className="font-bold text-base text-black">Jhon Smith</h1>
            <p className="text-sm text-gray-500">Gold Member</p>
          </div>
        </div>
        <div className="mt-5 ">
          <div>
            <h1 className="font-bold text-gray-500 text-base">INFORMATIONS</h1>
          </div>
          <div className="bg-white mt-5">
            <div className="flex items-center justify-between px-4 py-1">
              <p className="font-bold text-base text-black flex-1">Username</p>
              <div className="flex items-center space-x-2">
                <p className="text-[#BEC2CE] text-xs">papichulo_nene</p>
                <ChevronRightIcon className='h-5 text-[#BEC2CE]' />
              </div>
            </div>
            <div className="flex items-center justify-between px-4 py-1">
              <p className="font-bold text-base text-black flex-1">
                Phone Number
              </p>
              <div className="flex items-center space-x-2">
                <p className="text-[#BEC2CE] text-xs">000-2222-111-333</p>
                <ChevronRightIcon className='h-5 text-[#BEC2CE]' />
              </div>
            </div>
            <div className="flex items-center justify-between px-4 py-1">
              <p className="font-bold text-base text-black flex-1">Email</p>
              <div className="flex items-center space-x-2">
                <p className="text-[#BEC2CE] text-xs">youmail@website.com</p>
                <ChevronRightIcon className='h-5 text-[#BEC2CE]' />
              </div>
            </div>
            <div className="flex items-center justify-between px-4 py-1">
              <p className="font-bold text-base text-black flex-1">Gender</p>
              <div className="flex items-center space-x-2">
                <p className="text-[#BEC2CE] text-xs">Female</p>
                <ChevronRightIcon className='h-5 text-[#BEC2CE]' />
              </div>
            </div>
            <div className="flex items-center justify-between px-4 py-1">
              <p className="font-bold text-base text-black flex-1">Birthday</p>
              <div className="flex items-center space-x-2">
                <p className="text-[#BEC2CE] text-xs">March 10, 1999</p>
                <ChevronRightIcon className='h-5 text-[#BEC2CE]' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </MobileLayout>
  )
}

export default ProfileMobile
