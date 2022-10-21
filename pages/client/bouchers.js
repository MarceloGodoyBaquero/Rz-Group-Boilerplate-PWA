import React, { useEffect, useState } from 'react'
import Nav from '../../components/Nav'
import MobileLayout from '../../components/MobileLayout'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
// eslint-disable-next-line
import { getPaymentsByUserId } from '../../Redux/Actions/paymentActions'
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
  const { payments, user } = useSelector(state => state)

  useEffect(() => {
    dispatch(getPaymentsByUserId(user.id))
  }, [])
  return (
    <MobileLayout>
      <div className={'md:shadow-2xl bg-[#F7F8FA] h-screen flex items-center flex-col'}>
        <Nav location={'Mis Vouchers'}/>
        {
          payments && !payments.data.msg === 'not services found'
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
                          className={tab === 1 ? 'bg-yellow-400 w-full rounded-l-2xl h-[50px] font-bold' : 'bg-white w-full rounded-l-2xl h-[50px]'}>
                            Pendientes
                  </button>
                  <button onClick={(e) => setTab(2)}
                          className={tab === 2 ? 'bg-green-400 w-full rounded-r-2xl h-[50px] font-bold' : 'w-full rounded-r-2xl h-[50px]'}>
                            Finalizados
                  </button>
                </div>
                <div className={'mt-1 mb-5 flex w-full flex-row items-center justify-center'}>
                  {tab === 1 &&
                    <div className={'flex flex-col justify-center w-full items-center'}>
                      <div className={'mt-5 mb-5 flex w-full flex-row items-center justify-center'}>
                        {
                          subTab === 1 &&
                          <div className={'flex flex-col justify-center w-full items-center'}>
                            {
                              payments && payments?.data?.filter(e => !e.isPaid).length === 0
                                ? <div className={'flex flex-col justify-center w-full items-center'}>
                                <h1 className={'text-2xl font-bold'}>No tienes pagos pendientes!</h1>
                              </div>
                                : <div className={'flex flex-col justify-evenly w-full items-center ml-3 mr-3 mb-5'}>
                                  <div className='flex flex-col justify-evenly items-start w-full mt-3 ml-5'>
                                    <div className='flex flex-row justify-center items-center'>
                                      <h1 className='font-bold'>
                                        Vouchers pendientes:
                                        <span className='text-red-500 font-bold ml-3'>{
                                          payments && payments?.data?.filter(e => e.paymentType === 'voucher' && !e.isPaid).length
                                        }</span>
                                      </h1>
                                    </div>
                                  <div className='flex flex-row justify-evenly items-center'>
                                  <h1 className='font-bold'>
                                        Montos pendientes: $ <span className='text-red-500 font-bold'>{
                                          payments && payments?.data?.filter(e => e.paymentType === 'voucher' && !e.isPaid).reduce((a, b) => a + b.paymentAmount, 0)
                                        }</span>
                                      </h1>
                                    </div>
                                  </div>
                              </div>
                            }
                            {payments && payments?.data?.filter(e => !e.isPaid)?.map((item, index) =>
                              <ClientBoucherCard key={index} id={item._id} estado={item.isPaid} paymentAmount={item.paymentAmount} paymentType={item.paymentType} startDate={item.start_date} driver={item.driver} rol={user.roles}/>
                            )}
                          </div>
                        }
                      </div>
                    </div>}
                  {tab === 2 &&
                    <div className={'mt-5 flex flex-col justify-center w-full items-center'}>
                      {
                        payments && payments?.data?.filter(e => e.isPaid).length === 0
                          ? <div className={'flex flex-col justify-center w-full items-center'}>
                          <h1 className={'text-2xl font-bold'}>No tienes pagos finalizados!</h1>
                        </div>
                          : <div className={'flex flex-col justify-evenly w-full items-center ml-3 mr-3 mb-5'}>
                        <div className='flex flex-col justify-evenly items-start w-full mt-3 ml-5'>
                          <div className='flex flex-row justify-center items-center'>
                            <h1 className='font-bold'>
                              Vouchers Pagados:
                              <span className='text-green-500 font-bold ml-3'>{
                                payments && payments?.data?.filter(e => e.paymentType === 'voucher' && e.isPaid).length
                              }</span>
                            </h1>
                          </div>
                        <div className='flex flex-row justify-evenly items-center'>
                        <h1 className='font-bold'>
                              Total Vouchers: $ <span className='text-green-500 font-bold'>{
                                payments && payments?.data?.filter(e => e.paymentType === 'voucher' && e.isPaid).reduce((a, b) => a + b.paymentAmount, 0)
                              }</span>
                            </h1>
                          </div>
                          <div className='flex flex-row justify-evenly items-center'>
                          <h1 className='font-bold'>
                             Servicios con efectivo: <span className='text-green-500 font-bold'>{
                                payments && payments?.data?.filter(e => e.paymentType === 'cash' && e.isPaid).length
                             }</span>
                          </h1>
                          </div>
                            <div className='flex flex-row justify-evenly items-center'>
                            <h1 className='font-bold'>
                              Total efectivo: $ <span className='text-green-500 font-bold'>{
                                payments && payments?.data?.filter(e => e.paymentType === 'cash' && e.isPaid).reduce((a, b) => a + b.paymentAmount, 0)
                              }</span>
                            </h1>
                            </div>
                        </div>
                    </div>
                      }
                      {payments && payments?.data?.filter(e => e.isPaid)?.map((item, index) =>
                              <ClientBoucherCard key={index} id={item._id} estado={item.isPaid} paymentAmount={item.paymentAmount} paymentType={item.paymentType} startDate={item.start_date} driver={item.driver}/>
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
