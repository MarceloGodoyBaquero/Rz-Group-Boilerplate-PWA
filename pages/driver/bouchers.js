import React, { useEffect, useState } from 'react'
import Nav from '../../components/Nav'
import MobileLayout from '../../components/MobileLayout'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
// eslint-disable-next-line
import { getPaymentsByDriverId } from '../../Redux/Actions/paymentActions'
import ClientBoucherCard from '../../components/ClientBoucherCard'
import * as PropTypes from 'prop-types'
import { Spinner, Modal, Button } from 'flowbite-react'
import axios from 'axios'
import { InformationCircleIcon } from '@heroicons/react/24/solid'

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
  const [loading, setLoading] = useState(false)
  const [debt, setDebt] = useState('')
  const [popUp, setPopUp] = useState(false)
  const [unpaid, setUnpaid] = useState([])

  useEffect(() => {
    axios.get(`https://rz-group-backend.herokuapp.com/api/payment/driver/unpaid/${user.id}`)
      .then(res => {
        setUnpaid(res.data.data)
      })
  }, [payments])

  useEffect(() => {
    dispatch(getPaymentsByDriverId(user.id))
  }, [])

  const handleSearchDebt = () => {
    setLoading(true)
    axios.get(`https://rz-group-backend.herokuapp.com/api/payment/debt/${user.id}`)
      .then(res => {
        setDebt(res.data)
        setPopUp(true)
        setLoading(false)
      }).catch(err => {
        console.log(err)
      })
  }

  return (
    <MobileLayout>
      <div className={'md:shadow-2xl bg-[#F7F8FA] h-screen flex items-center flex-col'}>
        <Nav location={'Mis Vouchers'} />
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
                              unpaid && unpaid?.length === 0
                                ? <div className={'flex flex-col justify-center w-full items-center'}>
                                  <h1 className={'text-2xl font-bold'}>No tienes pagos pendientes!</h1>
                                </div>
                                : <div className={'flex flex-col justify-evenly w-full items-center ml-3 mr-3 mb-5'}>
                                  <div className='flex flex-col justify-evenly items-start w-full mt-3 ml-5'>
                                    <div className='flex flex-row justify-center items-center'>
                                      <h1 className='font-bold'>
                                        Vouchers pendientes:
                                        <span className='text-red-500 font-bold ml-3'>{
                                          unpaid && unpaid?.length
                                        }</span>
                                      </h1>
                                    </div>
                                    <div className='flex flex-row justify-evenly items-center'>
                                      <h1 className='font-bold'>
                                        Montos pendientes: $ <span className='text-red-500 font-bold'>{
                                          unpaid && unpaid?.reduce((a, b) => a + b.paymentAmount, 0)
                                        }</span>
                                      </h1>
                                    </div>
                                    <div className='flex flex-col justify-center items-center mr-5'>
                              <button className='bg-[#5b211f] rounded-lg w-[100px] h-[40px] text-white text-center text-sm font-bold border-[none]' onClick={() => handleSearchDebt()}>
                                {
                                  loading
                                    ? (
                                      <Spinner color="warning"
                                        aria-label="Warning spinner example" />
                                      )
                                    : (
                                      <p>Estado de cuenta</p>
                                      )
                                }
                              </button>
                            </div>
                            {
                        debt && popUp &&
                        <Modal
                          show={popUp}
                          size={'xl'}
                          style={{
                            height: '100vh'
                          }}
                          onClose={() => setPopUp(false)}
                        >
                          <Modal.Header className='text-2xl font-bold'>
                           Estado de cuenta
                          </Modal.Header>
                          <Modal.Body>
                            <div className="space-y-6 flex flex-col justify-start items-start">
                              <div className='flex flex-row justify-center items-center w-full'>
                              <InformationCircleIcon className=' text-gray-500 mr-2 h-16 w-16'/>
                              <h1 className='text-xl'>
                                Resumen de tu cuenta de los ultimos 15 dias.
                              </h1>
                              </div>
                              <h1>
                              servicios con voucher:
                                <span className='font-bold text-green-500'>{debt.voucher}</span>
                              </h1>
                              <h1>
                              servicios con efectivo:
                                <span className='font-bold text-red-500'>{debt.cash}</span>
                              </h1>
                              <h1>
                                Monto total en efectivo:
                                <span className='font-bold text-green-500'>$ {debt.amountCash}</span>
                              </h1>
                              <h1>
                                Monto total en voucher:
                                <span className='font-bold text-red-500'>$ {debt.amountVoucher}</span>
                              </h1>
                              <h1>
                                Descuento 10% por servicios:
                                <span className='font-bold text-green-500'>${debt.discount}</span>
                              </h1>
                              <h1>
                                Recibiras en total:
                                <span className='font-bold text-green-500'>$ {debt.debt}</span>
                              </h1>
                            </div>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button onClick={() => setPopUp(false)} color='success' >
                              Cerrar
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      }
                                  </div>
                                </div>
                            }
                            {unpaid.length && unpaid.map((item, index) =>
                              <ClientBoucherCard rol={user.roles} key={index} id={item._id} estado={item.isPaid} paymentAmount={item.paymentAmount} paymentType={item.paymentType} startDate={item.start_date} driver={item.client} />
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
                          : <div className={'flex flex-row justify-evenly w-full items-center ml-3 mr-3 mb-5'}>
                            <div className='flex flex-col justify-evenly items-start w-full mt-3 ml-5'>
                            </div>
                          </div>
                      }
                      {payments && payments?.data?.filter(e => e.isPaid)?.map((item, index) =>
                        <ClientBoucherCard rol={user.roles} key={index} id={item._id} estado={item.isPaid} paymentAmount={item.paymentAmount} paymentType={item.paymentType} startDate={item.start_date} driver={item.client} />
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
