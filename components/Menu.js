import React from 'react'
import {
  ArrowRightOnRectangleIcon, BellIcon, CalendarIcon,
  ChevronRightIcon, Cog8ToothIcon,
  HomeIcon,
  XCircleIcon
} from '@heroicons/react/24/solid'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

export default function Menu (props) {
  const { user } = useSelector(state => state)
  return (
    <div className={'bg-white w-5/6 inset-0 md:w-[533px] md:mr-[107px] md:inset-auto h-screen fixed p-5'}>
      {/**/}
      <div className={'flex flex-row justify-between'}>
        <div className={'flex items-center'}>
          <div className={'bg-gray-500 w-[80px] h-[80px] rounded-full'}>
          </div>
          <div className={'ml-3'}>
            <h3 className={'font-bold'}>{user?.name}</h3>
            <h3>{user?.roles.toUpperCase()}</h3>
          </div>
        </div>
        <div>
          <XCircleIcon onClick={() => props.closeFunc(!open)} className={'w-[30px] cursor-pointer'}/>
        </div>
      </div>
      {/* links */}
      <div>
        <button className={'mt-5 mb-5 w-full flex flex-row items-center justify-between'}>
          <div className={'flex flex-row'}>
            <HomeIcon className={'h-[20px] mr-5'}/>
            <h3 className={'font-bold'}>HOME</h3>
          </div>
          <div>
            <ChevronRightIcon className={'h-[20px]'}/>
          </div>
        </button>
        <button className={'mt-5 mb-5 w-full flex flex-row items-center justify-between'}>
          <div className={'flex flex-row'}>
            <CalendarIcon className={'h-[20px] mr-5'}/>
            <h3 className={'font-bold'}>HISTORIAL</h3>
          </div>
          <div>
            <ChevronRightIcon className={'h-[20px]'}/>
          </div>
        </button>
        <button className={'mt-5 mb-5 w-full flex flex-row items-center justify-between'}>
          <div className={'flex flex-row'}>
            <BellIcon className={'h-[20px] mr-5'}/>
            <h3 className={'font-bold'}>NOTIFICACIONES</h3>
          </div>
          <div>
            <ChevronRightIcon className={'h-[20px]'}/>
          </div>
        </button>
        <button className={'mt-5 mb-5 w-full flex flex-row items-center justify-between'}>
          <div className={'flex flex-row'}>
            <Cog8ToothIcon className={'h-[20px] mr-5'}/>
            <h3 className={'font-bold'}>CONFIGURACIÓN</h3>
          </div>
          <div>
            <ChevronRightIcon className={'h-[20px]'}/>
          </div>
        </button>
        <button className={'mt-5 mb-5 w-full flex flex-row items-center justify-between'}>
          <div className={'flex flex-row'}>
            <ArrowRightOnRectangleIcon className={'h-[20px] mr-5'}/>
            <h3 className={'font-bold'}>SALIR</h3>
          </div>
          <div>
            <ChevronRightIcon className={'h-[20px]'}/>
          </div>
        </button>
      </div>
    </div>

  )
}

Menu.propTypes = {
  closeFunc: PropTypes.func
}
