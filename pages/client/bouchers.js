import React, { useEffect, useState } from 'react'
import Nav from '../../components/Nav'
import MobileLayout from '../../components/MobileLayout'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
// eslint-disable-next-line
import { getServices, getServicesUserId } from '../../Redux/Actions/servicesActions'
import ClientBoucherCard from '../../components/ClientBoucherCard'
import * as PropTypes from 'prop-types'

ClientBoucherCard.propTypes = {
  estado: PropTypes.string,
  id: PropTypes.number
}
export default function travels ({ data }) {
  const [tab, setTab] = useState(1)
  // eslint-disable-next-line
  const [subTab, setSubTab] = useState(1)
  const router = useRouter()
  const dispatch = useDispatch()
  const { services, user } = useSelector(state => state)

  const finalizados = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const pendientes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  useEffect(() => {
    dispatch(getServicesUserId(user.id))
  }, [])
  return (
    <MobileLayout>
      <div className={'md:shadow-2xl bg-[#F7F8FA] h-fit h-fit flex items-center flex-col'}>
        <Nav location={'Mis Vouchers'}/>
        {
          !services.msg === 'not services found'
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
                          className={tab === 1 ? 'bg-yellow-400 w-full rounded-l-2xl h-[50px] font-bold' : 'bg-white w-full rounded-l-2xl h-[50px]'}>Pendientes
                  </button>
                  <button onClick={(e) => setTab(2)}
                          className={tab === 2 ? 'bg-green-400 w-full rounded-r-2xl h-[50px] font-bold' : 'w-full rounded-r-2xl h-[50px]'}>Finalizados
                  </button>
                </div>
                <div className={'mt-1 mb-5 flex w-full flex-row items-center justify-center'}>
                  {tab === 1 &&
                    <div className={'flex flex-col justify-center w-full items-center'}>
                      <div className={'mt-5 mb-5 flex w-full flex-row items-center justify-center'}>
                        {
                          subTab === 1 &&
                          <div className={'flex flex-col justify-center w-full items-center'}>
                            {pendientes.map((item, index) =>
                              <ClientBoucherCard key={index} id={index} estado={'Pendiente'}/>
                            )}
                          </div>
                        }
                      </div>
                    </div>}
                  {tab === 2 &&
                    <div className={'mt-5 flex flex-col justify-center w-full items-center'}>
                      {finalizados.map((item, index) =>
                        <ClientBoucherCard key={index} id={index} estado={'Finalizado'}/>
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
