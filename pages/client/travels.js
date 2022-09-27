import React, {useEffect, useState} from 'react'
import Nav from '../../components/Nav'
import MobileLayout from '../../components/MobileLayout'
import {useRouter} from 'next/router'
import {useDispatch, useSelector} from "react-redux";
import {getServices} from "../../Redux/Actions/servicesActions";
import ClientTravelsCard from "../../components/ClientTravelsCard";

export default function travels({data}) {
  const [tab, setTab] = useState(1)
  const [subTab, setSubTab] = useState(1)
  const router = useRouter()
  const dispatch = useDispatch()
  const {services} = useSelector(state => state)

  const finalizados = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const pendientes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const enMarcha = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  useEffect(() => {
    dispatch(getServices())
  }, [])
  return (
    <MobileLayout>
      <div className={'md:shadow-2xl bg-[#F7F8FA] h-fit h-screen flex items-center flex-col'}>
        <Nav location={'Mis servicios'}/>
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
                        {enMarcha.map((item, index) =>
                          <ClientTravelsCard estado={'En marcha'}/>
                        )}
                      </div>
                    }
                    {
                      subTab === 2 &&
                      <div className={'flex flex-col justify-center w-full items-center'}>
                        {enMarcha.map((item, index) =>
                          <ClientTravelsCard estado={'Pendiente'}/>
                        )}
                      </div>
                    }
                  </div>
                </div>
              </div>}
            {tab === 2 &&
              <div className={'mt-5 flex flex-col justify-center w-full items-center'}>
                {finalizados.map((item, index) =>
                  <ClientTravelsCard estado={'Finalizado'}/>
                )}
              </div>}
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}
