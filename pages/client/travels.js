/* eslint-disable */
import React, {useEffect, useState} from 'react'
import Nav from '../../components/Nav'
import MobileLayout from '../../components/MobileLayout'
import {useRouter} from 'next/router'
import {useDispatch, useSelector} from 'react-redux'
import {getServices, getServicesUserId, getIncomingServices} from '../../Redux/Actions/servicesActions'
import {getVehiclesByUser} from '../../Redux/Actions/vehiclesActions'
import ClientTravelsCard from '../../components/ClientTravelsCard'

export default function travels({data}) {
  const [tab, setTab] = useState(1)
  const [subTab, setSubTab] = useState(1)
  const router = useRouter()
  const dispatch = useDispatch()
  const {services, user} = useSelector(state => state)

  useEffect(() => {
    if (user?.roles === 'client') {
      return dispatch(getServicesUserId(user.id))
    }
    if (user?.roles === 'driver') {
      dispatch(getIncomingServices(user.id))
      dispatch(getVehiclesByUser(user.id))
    }
  }, [])
  return (
    <MobileLayout>
      <div className={'md:shadow-2xl bg-[#F7F8FA] h-fit h-screen flex items-center flex-col'}>
        <Nav location={'Mis servicios'}/>
        {
          services?.msg === 'not services found'
            ? <div className={'flex flex-col justify-center w-full h-screen items-center'}>
              <div className={'flex flex-col justify-center items-center'}>
                <h1 className={'text-2xl font-bold'}>No tienes servicios creados!</h1>
                <button onClick={() => router.push('/FuecForm')}
                        className={'w-full rounded-[25px] h-[50px] text-white bg-[#5B211F]'}>
                  CREAR SERVICIO
                </button>
              </div>
            </div>
            : <div className={'flex flex-col justify-center w-full items-center'}>
              <div className={'flex flex-col justify-center w-full items-center'}>
                <div
                  className={'mt-5 flex bg-white rounded-2xl flex-row justify-around w-5/6 h-[50px] items-center drop-shadow-xl'}>
                  <button onClick={(e) => setTab(1)}
                          className={tab === 1 ? 'bg-green-400 w-full rounded-l-2xl h-[50px] font-bold' : 'bg-white w-full rounded-l-2xl h-[50px]'}>Activos
                  </button>
                  <button onClick={(e) => setTab(2)}
                          className={tab === 2 ? 'bg-orange-400 w-full rounded-r-2xl h-[50px] font-bold' : 'w-full rounded-r-2xl h-[50px]'}>Finalizados
                  </button>
                </div>
                <div className={'mt-1 mb-5 flex w-full flex-row items-center justify-center'}>
                  {tab === 1 &&
                    <div className={'flex flex-col justify-center w-full items-center'}>
                      <div
                        className={'mt-5 flex bg-white rounded-2xl flex-row justify-around w-4/6 h-[50px] items-center drop-shadow-xl'}>
                        <button onClick={(e) => setSubTab(1)}
                                className={subTab === 1 ? 'bg-green-400 w-full rounded-l-2xl h-[50px] font-bold' : 'bg-white w-full rounded-l-2xl h-[50px]'}>En
                          marcha
                        </button>
                        <button onClick={(e) => setSubTab(2)}
                                className={subTab === 2 ? 'bg-yellow-400 w-full rounded-r-2xl h-[50px] font-bold' : 'w-full rounded-r-2xl h-[50px]'}>Pendientes
                        </button>
                      </div>
                      <div className={'mt-5 mb-5 flex w-full flex-row items-center justify-center'}>
                        <div className={'flex flex-col justify-center w-full items-center'}>
                          {
                            subTab === 1 &&
                            <div className={'flex flex-col justify-center w-full items-center'}>
                              {services?.filter(e => e.status === 'on progress').length === 0
                                ? <h1 className={'text-2xl font-bold'}>¡No tienes servicios activos!</h1>
                                : services?.filter(e => e.status === 'on progress')?.map((item, index) =>
                                  <ClientTravelsCard key={index} id={item._id} data={item}/>
                                )}
                            </div>
                          }
                          {
                            subTab === 2 &&
                            <div className={'flex flex-col justify-center w-full items-center'}>
                              {services?.filter(e => e.status === 'pending').length === 0
                                ? <h1 className={'text-2xl font-bold'}>¡No tienes servicios en marcha!</h1>
                                : services?.filter(e => e.status === 'pending')?.map((item, index) =>
                                  <ClientTravelsCard key={index} id={item._id} data={item}/>
                                )}
                            </div>
                          }
                        </div>
                      </div>
                    </div>}
                  {tab === 2 &&
                    <div className={'mt-5 flex flex-col justify-center w-full items-center'}>
                      {services?.filter(e => e.status === 'completed').length === 0
                        ? <h1 className={'text-2xl font-bold'}>No tienes servicios finalizados!</h1>
                        : services?.filter(e => e.status === 'completed')?.map((item, index) =>
                          <ClientTravelsCard key={index} id={item._id} data={item} />
                        )}
                    </div>}
                </div>
              </div>
            </div>
        }
      </div>
    </MobileLayout>
  )
}
