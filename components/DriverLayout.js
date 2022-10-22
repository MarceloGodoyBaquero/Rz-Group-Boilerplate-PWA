import React, { useEffect } from 'react'
import Nav from './Nav'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getIncomingServices } from '../Redux/Actions/servicesActions'
/* eslint-disable-next-line */
import {getVehiclesByUser} from '../Redux/Actions/vehiclesActions'
import { BanknotesIcon, CalendarIcon, TruckIcon, PlusIcon } from '@heroicons/react/24/solid'

export default function DriverLayout () {
  const router = useRouter()
  const dispatch = useDispatch()
  const { user, services } = useSelector(state => state)
  useEffect(() => {
    if (!services.length) {
      dispatch(getIncomingServices(user.id))
    }
  }, [user])
  useEffect(() => {
    const pendingService = services.find(service => service.status === 'pending')
    if (pendingService) {
      toast.info('Tienes nuevos servicios pendientes', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    }
  }, [services])
  return (
    <div className={'md:shadow-2xl bg-[#F7F8FA] h-screen flex items-center flex-col'}>
      <Nav location={'Home'}/>
      <ToastContainer/>
      <div className={'h-5/6 flex flex-col justify-center w-full'}>
        <div className={'h-full -mt-14'}>
          <h2 className={'text-black font-bold text-xl m-5 pt-[2rem]'}>Bienvenido! {user.name}</h2>

          <div className={'flex w-full items-center justify-center flex-col pl-3 pr-3'}>

            <div className={'flex flex-row'}>
              <div onClick={() => router.push('/Vehicles')}
                   className={'m-3 flex flex-col items-center border-4 border-[#5b211f] h-[150px] w-1/2 rounded-2xl'}>
                <h2 className={'text-2xl font-bold w-5/6 h-2/3 flex items-center justify-center'}>Ver Vehículos</h2>
                <TruckIcon className={'w-full text-white bg-[#5b211f] h-1/3'}></TruckIcon>
              </div>
              <div onClick={() => router.push('/AddVehicle')}
                   className={'m-3 flex flex-col items-center border-4 border-[#5b211f] h-[150px] w-1/2 rounded-2xl'}>
                <h2 className={'text-2xl font-bold w-5/6 h-2/3 h-max flex items-center justify-center'}>Agregar Vehículo</h2>
                <PlusIcon className={'w-full text-white bg-[#5b211f] h-1/3'}></PlusIcon>
              </div>
            </div>

            <div onClick={() => router.push('/FuecFormCond')}
                 className={'m-3 flex flex-row items-center border-4 border-green-500 h-[80px] w-full rounded-full'}>
              <h2 className={'text-2xl font-bold w-5/6 h-max flex items-center justify-center'}>Crear Servicio</h2>
              <PlusIcon className={'w-1/6 text-white bg-green-500 h-[80px] rounded-r-full'}></PlusIcon>
            </div>
            <div onClick={() => router.push('driver/bouchers')}
                 className={'m-3 flex flex-row items-center border-4 border-green-500 h-[80px] w-full rounded-full'}>
              <h2 className={'text-2xl font-bold w-5/6 h-max flex items-center justify-center'}>Mis Pagos</h2>
              <BanknotesIcon className={'w-1/6 text-white bg-green-500 h-[80px] rounded-r-full'}></BanknotesIcon>
            </div>
            <div onClick={() => router.push('client/travels')}
                 className={'bg-Reserve m-3 flex flex-row items-center border-4 border-blue-500 h-[80px] w-full rounded-full'}>
              <h2 className={'text-2xl font-bold w-5/6 h-max flex items-center justify-center'}>Mis Servicios</h2>
              <CalendarIcon className={'w-1/6 text-white bg-blue-500 h-[80px] rounded-r-full'}></CalendarIcon>
            </div>

            {/* <div */}
            {/*  onClick={() => router.push('/Vehicles')} */}
            {/*  className={'cursor-pointer flex items-center justify-center text-white bg-Ride w-full rounded-3xl h-[80px] m-3'}> */}
            {/*  <div className={'w-full flex flex-row items-center justify-evenly'}> */}
            {/*    <h2 className={'text-2xl font-bold bg-black p-1 rounded-3xl'}>Ver Vehículos</h2> */}
            {/*    <EyeIcon */}
            {/*      className={'text-2xl font-bold bg-blue-500 p-1 h-[50px] w-[50px] rounded-3xl flex items-center justify-center text-center'}></EyeIcon> */}
            {/*  </div> */}
            {/* </div> */}
            {/* <div */}
            {/*  onClick={() => router.push('/AddVehicle')} */}
            {/*  className={'cursor-pointer flex items-center justify-center text-white bg-Garage w-full rounded-3xl h-[80px] m-3'}> */}
            {/*  <div className={'w-full flex flex-row items-center justify-evenly'}> */}
            {/*    <h2 className={'text-2xl font-bold bg-black p-1 rounded-3xl text-center'}>Agregar Vehículo </h2> */}
            {/*    <PlusIcon */}
            {/*      className={'text-2xl font-bold bg-green-500 p-1 h-[50px] w-[50px] rounded-3xl flex items-center justify-center text-center'}>+</PlusIcon> */}
            {/*  </div> */}
            {/* </div> */}
            {/* <div */}
            {/*  onClick={() => router.push('/FuecForm')} */}
            {/*  className={'cursor-pointer flex items-center justify-center text-white bg-Reserve w-full rounded-3xl h-[80px] m-3'}> */}
            {/*  <div className={'w-full flex flex-row items-center justify-evenly'}> */}
            {/*    <button className={'text-2xl font-bold bg-black p-1 rounded-3xl'}>Crear Servicio</button> */}
            {/*    <PlusIcon */}
            {/*      className={'text-2xl font-bold bg-green-500 p-1 h-[50px] w-[50px] rounded-3xl flex items-center justify-center text-center'}>+</PlusIcon> */}
            {/*  </div> */}
            {/* </div> */}
            {/* <div */}
            {/*  onClick={() => router.push('driver/bouchers')} */}
            {/*  className={'cursor-pointer flex items-center justify-center text-white bg-Reserve w-full rounded-3xl h-[80px] m-3'}> */}
            {/*  <div className={'w-full flex flex-row items-center justify-evenly'}> */}
            {/*    <h2 className={'text-2xl font-bold bg-black p-1 rounded-3xl'}>Ver vouchers de pago</h2> */}
            {/*    <BanknotesIcon */}
            {/*      className={'text-2xl font-bold bg-blue-500 p-1 h-[50px] w-[50px] rounded-3xl flex items-center justify-center text-center'}></BanknotesIcon> */}
            {/*  </div> */}
            {/* </div> */}
            {/* <div */}
            {/*  onClick={() => router.push('client/travels')} */}
            {/*  className={'cursor-pointer flex items-center justify-center text-white bg-Reserve w-full rounded-3xl h-[80px] m-3'}> */}
            {/*  <div className={'w-full flex flex-row items-center justify-evenly'}> */}
            {/*    <h2 className={'text-2xl font-bold bg-black p-1 rounded-3xl'}>Ver historial de servicios</h2> */}
            {/*    <CalendarIcon */}
            {/*      className={'text-2xl font-bold bg-blue-500 p-1 h-[50px] w-[50px] rounded-3xl flex items-center justify-center text-center'}></CalendarIcon> */}
            {/*  </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
