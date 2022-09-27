import React from 'react'
import Nav from './Nav'
import {BanknotesIcon, CalendarIcon, ClockIcon} from '@heroicons/react/24/outline'
import {useRouter} from 'next/router'

export default function RiderLayout() {
  const router = useRouter()
  const viajes = [1, 2, 3, 4]
  return (
    <div className={'md:shadow-2xl bg-[#F7F8FA] h-screen flex items-center flex-col'}>
      <Nav location={'Home'}/>
      <div className={'h-1/2 flex flex-col justify-center w-full'}>
        <div>
          <h2 className={'text-black font-bold text-2xl m-5 pt-[2rem]'}>Take a Ride</h2>
          <div className={'flex w-full'}>
            <div
              onClick={() => router.push('/Fuec')}
              className={'cursor-pointer flex items-center justify-center text-white bg-Ride w-1/2 rounded-3xl h-[200px] m-5'}>
              <h2 className={'text-2xl font-bold bg-black p-1 rounded-3xl'}>RIDE</h2>
            </div>
            <div
              className={'cursor-pointer flex items-center justify-center text-white bg-Reserve w-1/2 rounded-3xl h-[200px] m-5'}>
              <h2 className={'text-2xl font-bold bg-black p-1 rounded-3xl'}>RESERVE</h2>
            </div>
          </div>
        </div>
        <div>
          <h2 className={'text-black font-bold text-2xl m-5'}>Tus viajes activos</h2>
          <div>
            {viajes.slice(0, 1).map((viaje, index) => (
              <div key={index} className={'flex flex-col items-center justify-center'}>
                <div className={'bg-white w-full m-3 rounded p-3 flex'}>
                  <div>
                    <div className={'bg-gray-500 w-[66px] h-[66px] rounded-[50%] mr-3'}></div>
                  </div>
                  <div className={'w-full flex flex-col justify-center'}>
                    <div className={'flex items-center justify-between m-1'}>
                      <h3 className={'font-bold'}>Jhon Smith</h3>
                      <h3 className={'bg-orange-400 rounded-2xl text-white pl-2 pr-2'}>Pending</h3>
                    </div>
                    <div className={'flex items-center justify-evenly'}>
                      <div className={'flex items-center w-full'}>
                        <CalendarIcon className={'w-[16px]'}/>
                        <h3>Today</h3>
                      </div>
                      <div className={'flex items-center w-full'}>
                        <ClockIcon className={'w-[16px]'}/>
                        <h3>Pending</h3>
                      </div>
                      <div className={'flex items-center w-full '}>
                        <BanknotesIcon className={'w-[16px]'}/>
                        <h3>$200.00</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>))}
          </div>
        </div>
      </div>
      <div
        className={'overflow-auto bg-[#5b211f] w-full rounded-t-3xl mt-7 p-4 h-1/2 flex-grow flex-col items-center justify-center'}>
        <div>
          <h2 className={'text-white font-bold text-2xl text-center m-5'}>Tus ultimos viajes</h2>
        </div>
        <div className={'w-full'}>
          {viajes.map((viaje, index) => (
            <div key={index} className={'flex flex-col items-center justify-center'}>
              <div className={'bg-white w-full m-3 rounded p-3 flex'}>
                <div>
                  <div className={'bg-gray-500 w-[66px] h-[66px] rounded-[50%] mr-3'}></div>
                </div>
                <div className={'w-full flex flex-col justify-center'}>
                  <div className={'flex items-center justify-between m-1'}>
                    <h3 className={'font-bold'}>Jhon Smith</h3>
                    <h3 className={'bg-[#36B789] rounded-2xl text-white pl-2 pr-2'}>Completed</h3>
                  </div>
                  <div className={'flex items-center justify-evenly'}>
                    <div className={'flex items-center w-full'}>
                      <CalendarIcon className={'w-[16px]'}/>
                      <h3>20 Feb, 2020</h3>
                    </div>
                    <div className={'flex items-center w-full'}>
                      <ClockIcon className={'w-[16px]'}/>
                      <h3>2 Hours</h3>
                    </div>
                    <div className={'flex items-center w-full '}>
                      <BanknotesIcon className={'w-[16px]'}/>
                      <h3>$200.00</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>))}
          <div>
            <h2 onClick={() => router.push('client/travels')} className={'text-white font-bold text-2xl text-center m-2'}>Ver más</h2>
          </div>
        </div>
      </div>
    </div>
  )
}
