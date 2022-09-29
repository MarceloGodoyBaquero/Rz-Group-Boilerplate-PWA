import React from 'react'
import Nav from './Nav'

import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

export default function RiderLayout () {
  const router = useRouter()
  // const viajes = [1, 2, 3, 4]
  const { user } = useSelector(state => state)
  return (
    <div className={'md:shadow-2xl bg-[#F7F8FA] h-screen flex items-center flex-col'}>
      <Nav location={'Home'}/>
      <div className={'h-5/6 flex flex-col justify-center w-full'}>
        <div className={'h-3/6'}>
          <h2 className={'text-black font-bold text-2xl m-5 pt-[2rem]'}>Bienvenido! {user.name}</h2>
          <div className={'flex w-full items-center justify-center flex-col pl-3 pr-3'}>
            <div
              onClick={() => router.push('/FuecForm')}
              className={'cursor-pointer flex items-center justify-center text-white bg-Ride w-full rounded-3xl h-[130px] m-3'}>
              <button className={'text-2xl font-bold bg-black p-1 rounded-3xl'}>Crear servicio</button>
            </div>
            <div
              onClick={() => router.push('client/bouchers')}
              className={'cursor-pointer flex items-center justify-center text-white bg-Reserve w-full rounded-3xl h-[130px] m-3'}>
              <h2 className={'text-2xl font-bold bg-black p-1 rounded-3xl'}>Ver vouchers de pago</h2>
            </div>
          </div>
        </div>
        {/* <div className={'h-3/6'}> */}
        {/*  <h2 className={'text-black font-bold text-2xl m-5'}>Tus servicios activos</h2> */}
        {/*  <div className={'h-4/6 overflow-auto'}> */}
        {/*    {viajes.map((viaje, index) => ( */}
        {/*      <div key={index} className={'flex flex-col items-center justify-center'}> */}
        {/*        <div className={'bg-white w-full m-3 rounded p-3 flex'}> */}
        {/*          <div> */}
        {/*            <div className={'bg-gray-500 w-[66px] h-[66px] rounded-[50%] mr-3'}></div> */}
        {/*          </div> */}
        {/*          <div className={'w-full flex flex-col justify-center'}> */}
        {/*            <div className={'flex items-center justify-between m-1'}> */}
        {/*              <h3 className={'font-bold'}>Jhon Smith</h3> */}
        {/*              <h3 className={'bg-orange-400 rounded-2xl text-white pl-2 pr-2'}>Pending</h3> */}
        {/*            </div> */}
        {/*            <div className={'flex items-center justify-evenly'}> */}
        {/*              <div className={'flex items-center w-full'}> */}
        {/*                <CalendarIcon className={'w-[16px]'}/> */}
        {/*                <h3>Today</h3> */}
        {/*              </div> */}
        {/*              <div className={'flex items-center w-full'}> */}
        {/*                <ClockIcon className={'w-[16px]'}/> */}
        {/*                <h3>Pending</h3> */}
        {/*              </div> */}
        {/*              <div className={'flex items-center w-full '}> */}
        {/*                <BanknotesIcon className={'w-[16px]'}/> */}
        {/*                <h3>$200.00</h3> */}
        {/*              </div> */}
        {/*            </div> */}
        {/*          </div> */}
        {/*        </div> */}
        {/*      </div>))} */}
        {/*  </div> */}
        {/* </div> */}
      </div>
      <div
        className={'bg-[#5b211f] w-full rounded-t-3xl mt-7 p-4 flex-grow flex-col items-center justify-center'}>
        <div className={'w-full'}>
          <div>
            <h2 onClick={() => router.push('client/travels')}
                className={'hover:bg-blue-500 w-full flex items-center justify-center rounded-[25px] h-[50px] text-white bg-[white] text-gray-900 font-bold'}>Ver
              historial de servicios</h2>
          </div>
        </div>
      </div>
    </div>
  )
}
