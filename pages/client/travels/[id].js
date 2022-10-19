import React, { useEffect, useRef, useState } from 'react'
import MobileLayout from '../../../components/MobileLayout'
import Nav from '../../../components/Nav'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import {
  createService,
  deleteService,
  getServiceId,
  getServicesUserId,
  updateService,
  cancelService,
  clearService
} from '../../../Redux/Actions/servicesActions'
import { PDFDownloadLink } from '@react-pdf/renderer'
import FuecTemplate from '../../../components/FuecTemplate/FuecTemplate'
import axios from 'axios'
import SignaturePad from 'react-signature-canvas'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function users ({ data }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const { id } = router.query
  const { service, user } = useSelector(state => state)
  const [dateNow, setDateNow] = useState(null)
  const [popUpAdd, setPopUpAdd] = useState(false)
  const [popUpMOD, setPopUpMOD] = useState(false)
  const [tipoDePago, setTipoDePago] = useState('default')
  const [vehiclesCant, setVehiclesCant] = useState(0)
  const [popUpFinalizar, setPopUpFinalizar] = useState(false)
  const [servicioEdit, setServicioEdit] = useState({
    from: service.from,
    to: service.to,
    start_date: service.start_date,
    end_date: service.end_date
  })

  const [paid, setPaid] = useState({
    isPaid: null,
    description: '',
    from: '/',
    to: '/',
    start_date: '/',
    end_date: '/',
    number_vehicles: '/',
    serviceType: '/',
    category: '/',
    paymentType: '',
    paymentAmount: null,
    payment_description: '',
    client_signature: null,
    driver: '/',
    client: '/',
    alliedCompany: '/'
  })

  const sigCanvas = useRef({})

  useEffect(() => {
    return () => {
      dispatch(clearService())
    }
  }, [])
  // eslint-disable-next-line
  const [imageURL, setImageURL] = useState(null)

  useEffect(() => {
    if (id) {
      console.log(id)
      return dispatch(getServiceId(id))
    }
  }, [id])

  useEffect(() => {
    setServicioEdit({
      from: service?.from,
      to: service?.to,
      start_date: service?.start_date,
      end_date: service?.end_date
    })
  }, [service])

  const daysBetween = (date1, date2) => {
    const oneDay = 24 * 60 * 60 * 1000
    const firstDate = new Date(date1)
    const secondDate = new Date(date2)
    return Math.round(Math.abs((firstDate - secondDate) / oneDay))
  }

  useEffect(() => {
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    if (month < 10) {
      setDateNow(`${day}-0${month}-${year}`)
    }
    if (month >= 10) {
      setDateNow(`${day}-${month}-${year}`)
    }
  }, [dateNow])

  const handlePago = (e, id) => {
    e.preventDefault()
    if (paid.paymentType === 'cash') {
      setPaid({
        ...paid,
        isPaid: true
      })
      return axios.post('https://rz-group-backend.herokuapp.com/api/payment/create/' + service._id, paid)
        .then(res => {
          toast.success('Pago enviado correctamente', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          })
          setTimeout(() => {
            router.push('/client/travels')
          }, 2000)
        })
        .catch(err => console.log(err))
    }
    axios.post('https://rz-group-backend.herokuapp.com/api/payment/create/' + service._id, paid)
      .then(res => {
        toast.success('Pago enviado correctamente', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
        setTimeout(() => {
          router.push('/client/travels')
        }, 2000)
      })
      .catch(err => console.log(err))
  }

  const handleModificacion = (e, id) => {
    e.preventDefault()
    dispatch(updateService(service._id, servicioEdit))
    return dispatch(getServiceId(id))
  }

  const handleChangeModificacion = (e) => {
    e.preventDefault()
    setServicioEdit({
      ...servicioEdit,
      [e.target.name]: e.target.value
    })
  }

  const handleCancelTravel = (id) => {
    dispatch(cancelService(id))
  }

  const handleAddVehicle = (e) => {
    e.preventDefault()
    const servicio = {
      description: service.description + ' refuerzo',
      from: service.from,
      to: service.to,
      start_date: service.start_date,
      end_date: service.end_date,
      number_vehicles: 1,
      duration: service.duration,
      serviceType: service.serviceType,
      start_time: service.start_time,
      category: service.category,
      driver: user.roles === 'driver' ? [user.id] : [],
      client: user.id
    }
    for (let i = 0; i < vehiclesCant; i++) {
      dispatch(createService(servicio, router))
    }
  }

  const handleDelete = (e, id) => {
    e.preventDefault()
    dispatch(deleteService(id))
    router.push('/client/travels').then(dispatch(getServicesUserId(user.id)))
  }

  const clear = () => sigCanvas.current.clear()
  const save = () => {
    setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'))
    setPaid({
      ...paid,
      client_signature: sigCanvas.current.getTrimmedCanvas().toDataURL('image/png')
    })
  }

  const handleTypeChange = (e) => {
    e.preventDefault()
    setTipoDePago(e.target.value)
    if (e.target.value === 'cash') {
      console.log('cash')
      return setPaid({
        ...paid,
        isPaid: true,
        paymentType: e.target.value
      })
    } else {
      return setPaid({
        ...paid,
        isPaid: false,
        paymentType: e.target.value
      })
    }
  }

  useEffect(() => {
    setPaid({
      ...paid,
      description: service.description,
      from: service?.from,
      to: service?.to,
      start_date: service?.start_date,
      end_date: service?.end_date,
      number_vehicles: service?.number_vehicles,
      serviceType: service?.serviceType,
      category: service?.category,
      client: service?.client?._id,
      alliedCompany: service?.client?.companyAllied?._id
    })
  }, [service])

  return (
    <MobileLayout>
      <div className={'md:shadow-2xl bg-[#F7F8FA] h-screen flex items-center flex-col'}>
        <Nav location={'Detalles del Servicio'}/>
        <ToastContainer/>
        <div className={'p-5 bg-white w-5/6 drop-shadow-2xl rounded-xl flex flex-col justify-evenly'}>
          {service.payment
            ? (
              <>
                <h1>
                  Tipo de pago: <span
                  className={`${service.paymentType === 'cash' ? 'text-red-400 font-bold' : 'text-green-400 font-bold'}`}>{service.payment.paymentType === 'cash' ? 'Efectivo' : 'Voucher'}</span>
                </h1>
                <h1>
                  Estado de pago: <span
                  className={`${service.payment.isPaid ? 'text-green-400 font-bold' : 'text-red-400 font-bold'}`}>{service.payment.isPaid ? 'Pagado' : 'No pagado'}</span>
                </h1>
                <h1>
                  Monto: <span className={'text-green-400 font-bold'}>$ {service.payment.paymentAmount}</span>
                </h1>
              </>
              )
            : null}
          <h1>Categoría del servicio: {service?.category?.toUpperCase()}</h1>
          <h1>Tipo de servicio: {service?.serviceType?.toUpperCase()}</h1>
          <hr className={'m-3'}/>
          <h1>Desde: {service?.from}</h1>
          <h1>Hasta: {service?.to}</h1>
          <hr className={'m-3'}/>
          <h1>Cantidad de horas: {service?.duration?.length > 0 ? `${service.duration} hs` : 'N/A'}</h1>
          <h1>Inicio: {service?.start_date?.slice(0, 10)}</h1>
          <h1>Final: {service?.end_date?.slice(0, 10)}</h1>
        </div>
        <div className={'p-5 mt-3 bg-white w-5/6 drop-shadow-2xl rounded-xl flex flex-col justify-evenly'}>
          <h1>Descripción del viaje</h1>
          <h1>{service?.description}</h1>
        </div>
        {
          service.payment
            ? (
              <div className={'p-5 mt-3 bg-white w-5/6 drop-shadow-2xl rounded-xl flex flex-col justify-evenly'}>
                <h1>Descripción del pago</h1>
                <h1>{service?.payment.payment_description}</h1>
              </div>
              )
            : null
        }
        {
          service.payment
            ? service.payment.client_signature
              ? <div className={'p-5 mt-3 bg-white w-5/6 drop-shadow-2xl rounded-xl flex flex-col justify-evenly h-40'}>
                <h1 className='mb-3'>Firma del cliente</h1>
                <div className={'mt-10 bg-white w-full rounded-xl flex flex-col justify-evenly h-32 relative'}>
                  <Image src={service.payment.client_signature} alt="firma del cliente" layout='fill'
                         objectFit='contain'/>
                </div>
              </div>
              : null
            : null
        }
        <div className={'flex flex-col w-full items-center'}>
          {
            service?.status === 'completed'
          }
          {
            service?.status === 'on progress' && user.roles === 'driver'
              ? <PDFDownloadLink document={<FuecTemplate name={user.name} service={service}/>} fileName='fuec.pdf'
                                 className='w-full flex justify-center items-center'>
                <button
                  className={'mb-1 bg-[#5B211F] w-5/6 rounded-full mt-5 h-[50px] text-white font-bold'}>DESCARGAR
                  FUEC
                </button>
              </PDFDownloadLink>
              : <button onClick={(e) => handleDelete(e, service._id)}
                        style={service?.status === 'pending' && user?.id === service?.client?._id ? { display: 'block' } : { display: 'none' }}
                        className={'bg-red-400 w-5/6 rounded-xl mt-5 h-[50px] font-bold'}>ELIMINAR
              </button>
          }
          {
            daysBetween(service?.start_date?.slice(0, 10), dateNow) > 1 &&
            <button onClick={(e) => handleCancelTravel(id)}
                    style={service?.status === 'on progress' && user?.id === service?.client?._id ? { display: 'block' } : { display: 'none' }}
                    className={'bg-[#5B211F] w-5/6 rounded-full mt-5 h-[50px] text-white font-bold'}>
              CANCELAR
            </button>
          }
          {
            !popUpMOD
              ? <button onClick={() => setPopUpMOD(true)}
                        style={service?.status === 'pending' && user?.id === service?.client?._id ? { display: 'block' } : { display: 'none' }}
                        className={'bg-blue-400 w-5/6 rounded-xl mt-5 h-[50px] font-bold'}>MODIFICAR</button>
              : <div className={'w-5/6 flex flex-col items-center'}>
                <span className={'bg-gray-300 w-full h-0.5 mt-5'}></span>
                <input onChange={(e) => handleChangeModificacion(e)} name={'from'}
                       className={'indent-3 w-full rounded-xl mt-5 h-[50px] font-bold'} placeholder={'Origen'}/>
                <input onChange={(e) => handleChangeModificacion(e)} name={'to'}
                       className={'indent-3 w-full rounded-xl mt-5 h-[50px] font-bold'} placeholder={'Destino'}/>
                <input onChange={(e) => handleChangeModificacion(e)} name={'start_date'}
                       className={'indent-3 w-full rounded-xl mt-5 h-[50px] font-bold'} type={'date'}
                       placeholder={'Fecha de Inicio'}/>
                <input onChange={(e) => handleChangeModificacion(e)} name={'end_date'}
                       className={'indent-3 w-full rounded-xl mt-5 h-[50px] font-bold'} type={'date'}
                       placeholder={'Fecha de Finalización'}/>
                <div className={'w-full'}>
                  <button onClick={(e) => handleModificacion(e, service._id)}
                          className={'bg-blue-400 w-4/6 rounded-xl mt-5 h-[50px] font-bold'}>Guardar
                  </button>
                  <button onClick={() => setPopUpMOD(false)}
                          className={'bg-red-400 w-2/6 rounded-xl mt-5 h-[50px] font-bold'}>Cancelar
                  </button>
                </div>

              </div>
          }
          {
            !popUpAdd
              ? <button onClick={() => setPopUpAdd(true)}
                        style={service?.status === 'on progress' && user?.id === service?.client?._id ? { display: 'block' } : { display: 'none' }}
                        className={'bg-green-400 w-5/6 rounded-xl mt-5 h-[50px] font-bold'}>AGREGAR VEHÍCULOS
                EXTRA</button>
              : <div className={'w-5/6 flex flex-col'}>
                <span className={'bg-gray-300 w-full h-0.5 mt-5'}></span>
                <input
                  onChange={(e) => setVehiclesCant(e.target.value)}
                  placeholder={'Cantidad de vehículos extra'}
                  type={'number'}
                  className={'indent-3 w-full rounded-xl mt-5 h-[50px] font-bold'}/>
                <div>
                  <button
                    onClick={(e) => handleAddVehicle(e)}
                    className={'bg-green-400 w-4/6 rounded-xl mt-5 h-[50px] font-bold'}>Enviar
                  </button>
                  <button
                    onClick={() => setPopUpAdd(false)}
                    className={'bg-red-400 w-2/6 rounded-xl mt-5 h-[50px] font-bold'}>Cancelar
                  </button>
                </div>
              </div>
          }
          {
            service?.status === 'on progress' && user.roles === 'driver'
              // eslint-disable-next-line
              ? !popUpFinalizar ? <button
                  // onClick={(e) => handleFinalizarServicio(e, service._id)}
                  onClick={() => {
                    setPopUpFinalizar(true)
                    setPaid({
                      ...paid,
                      driver: service.driver[0]._id
                    })
                  }}
                  className={'mb-1 border-[#5B211F] border-2 w-5/6 rounded-full mt-5 h-[50px] text-[#5B211F] font-bold'}>
                  FINALIZAR SERVICIO
                </button>
                  : <div className={'w-5/6 flex flex-col items-center'}>
                  <hr/>
                  <select
                    onChange={(e) => handleTypeChange(e)}
                    className={'w-full rounded-xl mt-5 h-[50px] font-bold'}>
                    <option value={'default'}>Forma de pago?</option>
                    <option value={'cash'}>Efectivo</option>
                    <option value={'voucher'}>Voucher</option>
                  </select>
                  {tipoDePago === 'default'
                    ? null
                    : <input
                      onChange={(e) => {
                        setPaid({
                          ...paid,
                          paymentAmount: Number(e.target.value)
                        })
                      }}
                      placeholder={'Monto?'}
                      type={'number'}
                      className={'indent-3 w-full rounded-xl mt-5 h-[50px] font-bold'}/>
                  }
                  {
                    tipoDePago === 'cash'
                      ? <textarea
                        onChange={(e) => {
                          setPaid({
                            ...paid,
                            payment_description: e.target.value
                          })
                        }}
                        placeholder={'Descripción'}
                        className={'indent-3 w-full rounded-xl mt-5 h-[100px] font-bold'}/>
                      : null
                  }
                  {
                    tipoDePago === 'voucher'
                      ? <div className={'w-full'}>
                        <textarea
                          onChange={(e) => {
                            setPaid({
                              ...paid,
                              payment_description: e.target.value
                            })
                          }}
                          placeholder={'Descripción'}
                          className={'indent-3 w-full rounded-xl mt-5 h-[100px] font-bold'}/>
                        <div className={'text-center mt-5'}>
                          <label className={'font-bold text-center mt-5'}>
                            FIRMA
                            <SignaturePad
                              ref={sigCanvas}
                              canvasProps={{
                                className: 'border border-black rounded-xl w-full mt-5'
                              }}
                              backgroundColor={'#ffffff'}
                            />
                          </label>
                          <div className={'w-full flex flex-row'}>
                            <button onClick={clear}
                                    className={'w-1/2 bg-cyan-400 rounded-xl mt-5 mr-1 h-[50px] font-bold'}>LIMPIAR
                              FIRMA
                            </button>
                            <button onClick={save}
                                    className={'w-1/2 bg-green-400 rounded-xl mt-5 ml-1 h-[50px] font-bold'}>GUARDAR
                              FIRMA
                            </button>
                          </div>
                        </div>
                      </div>
                      : null
                  }
                  <div className={'w-full'}>
                    < button onClick={(e) => handlePago(e, service._id)}
                             className={'bg-[#5B211F] w-4/6 rounded-xl mt-5 h-[50px] text-white font-bold'}>Finalizar
                    </button>
                    <button onClick={() => setPopUpFinalizar(false)}
                            className={'bg-red-400 w-2/6 rounded-xl mt-5 h-[50px] font-bold'}>Cancelar
                    </button>
                  </div>
                </div>
              : null
          }
        </div>
      </div>
    </MobileLayout>
  )
}
