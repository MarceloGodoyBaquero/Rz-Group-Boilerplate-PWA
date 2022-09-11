import React from 'react'
import MobileLayout from '../components/MobileLayout'
import Image from 'next/image'
import defaultImage from '../public/Images/fakeimg.png'
import Nav from '../components/Nav'
import { LockClosedIcon, BellAlertIcon, Cog8ToothIcon, CreditCardIcon, ChevronRightIcon, EnvelopeIcon, PhoneIcon, LinkIcon, LanguageIcon, BanknotesIcon } from '@heroicons/react/24/solid'
import { GoSignOut, GoMailRead } from 'react-icons/go'

export default function Settings () {
  return (
    <MobileLayout>
    <div className={'md:shadow-2xl bg-[#F7F8FA] h-screen'}>
      {/* <div className="flex  items-center justify-between">
        <Feather name="menu" size={20} color="#000" />
        <h1 className="font-bold text-xl text-black flex-1 text-center">
          Settings
        </h1>
      </div> */}
      <Nav location={'Settings'}/>
      <div className="bg-gray-50 mt-2 p-4 ">
        <div className="flex items-center justify-between bg-white shadow-md rounded-xl p-4">
          <Image
            className="w-12 h-12 rounded-full"
            width={'100%'}
            height={'100%'}
            src={defaultImage}
            alt="Rounded avatar"
          />
          <div className="flex-1 ml-4">
            <h1 className="font-bold text-base text-black">Jhon Smith</h1>
            <p className="text-sm text-gray-500">Basic Member</p>
          </div>
          <ChevronRightIcon className='h-5' style={{ color: '#c4c4c4' }}/>
        </div>
        <div className="mt-5 ">
          <div className="bg-[#5B211F] p-2 rounded-t-md shadow-md mb-3">
            <h1 className="font-bold text-white text-base">Accounts</h1>
          </div>
          <div className="bg-white">
            <div className="flex items-center justify-between px-4 py-1">
              <LockClosedIcon className="h-4" />
              <p className="font-bold text-base text-black flex-1 ml-4">
                Change Password
              </p>
              <ChevronRightIcon className='h-5' />
            </div>
            <div className="flex items-center justify-between px-4 py-1">
              <BellAlertIcon className="h-4" />
              <p className="font-bold text-base text-black flex-1 ml-4">
                Vehicle Management
              </p>
              <ChevronRightIcon className='h-5' />
            </div>
            <div className="flex items-center justify-between px-4 py-1">
                <Cog8ToothIcon className="h-4" />
              <p className="font-bold text-base text-black flex-1 ml-4">
                Document Management
              </p>
              <ChevronRightIcon className='h-5' />
            </div>
            <div className="flex items-center justify-between px-4 py-1">
            <CreditCardIcon className="h-4" />
              <p className="font-bold text-base text-black flex-1 ml-4">
                Payment
              </p>
              <ChevronRightIcon className='h-5' />
            </div>
            <div className="flex items-center justify-between px-4 py-1">
              <GoSignOut className="h-5" />
              <p className="font-bold text-base text-black flex-1 ml-4">
                Sign Out
              </p>
            </div>
          </div>
          <div className="p-2 mt-3 mb-3">
            <h1 className="text-base font-bold text-[#5B211F]">More Options</h1>
          </div>
          <div className="bg-white">
            <div className="flex items-center justify-between px-4 py-1">
              <GoMailRead className="h-5" />
              <p className="font-bold text-base text-black flex-1 ml-4">
                Newsletter
              </p>
              <label
                htmlFor="default-toggle"
                className="inline-flex relative items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  value=""
                  id="default-toggle"
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between px-4 py-1">
                <EnvelopeIcon className="h-4" />
              <p className="font-bold text-base text-black flex-1 ml-4">
                Text Message
              </p>
              <label
                htmlFor="default-toggle1"
                className="inline-flex relative items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  value=""
                  id="default-toggle1"
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between px-4 py-1">
              <PhoneIcon className="h-4" />
              <p className="font-bold text-base text-black flex-1 ml-4">
                Phone Call
              </p>
              <label
                htmlFor="default-toggle2"
                className="inline-flex relative items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  value=""
                  id="default-toggle2"
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between px-4 py-1">
              <BanknotesIcon className="h-4" />
              <p className="font-bold text-base text-black flex-1 ml-4">
                Currency
              </p>
              <div className="flex items-center space-x-2">
                <p className="text-gray-500 text-xs">$USD</p>
                <ChevronRightIcon className='h-5' />
              </div>
            </div>
            <div className="flex items-center justify-between px-4 py-1">
                <LanguageIcon className="h-4" />
              <p className="font-bold text-base text-black flex-1 ml-4">
                Language
              </p>
              <div className="flex items-center space-x-2">
                <p className="text-gray-500 text-xs">English</p>
                <ChevronRightIcon className='h-5' />
              </div>
            </div>
            <div className="flex items-center justify-between px-4 py-1">
              <LinkIcon className="h-4" />
              <p className="font-bold text-base text-black flex-1 ml-4">
                Linkend Accounts
              </p>
              <div className="flex items-center space-x-2">
                <p className="text-gray-500 text-xs">Facebook, go..</p>
                <ChevronRightIcon className='h-5' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </MobileLayout>
  )
};
