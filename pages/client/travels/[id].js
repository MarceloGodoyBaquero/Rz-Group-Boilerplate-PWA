import React, { useEffect, useState } from 'react'
import MobileLayout from '../../../components/MobileLayout'
import Nav from '../../../components/Nav'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import {
  createService,
  deleteService,
  getServiceId,
  getServicesUserId,
  updateService
} from '../../../Redux/Actions/servicesActions'
import { PDFDownloadLink } from '@react-pdf/renderer'
import FuecTemplate from '../../../components/FuecTemplate/FuecTemplate'
import axios from 'axios'

export default function users ({ data }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const { id } = router.query
  const { service, user } = useSelector(state => state)
  const [dateNow, setDateNow] = useState(null)
  const [diasRestantes, setDiasRestantes] = useState(null)
  const [popUpAdd, setPopUpAdd] = useState(false)
  const [popUpMOD, setPopUpMOD] = useState(false)
  const [popUpPago, setPopUpPago] = useState(false)
  const [pago, setPago] = useState(null)
  const [tipoDePago, setTipoDePago] = useState('default')
  const [voucher, setVoucher] = useState(null)
  const [descripcionPago, setDescripcionPago] = useState(null)
  const [vehiclesCant, setVehiclesCant] = useState(0)
  const [servicioEdit, setServicioEdit] = useState({
    from: service.from,
    to: service.to,
    start_date: service.start_date,
    end_date: service.end_date
  })
  useEffect(() => {
    if (id) {
      console.log(id)
      return dispatch(getServiceId(id))
    }
  }, [id])
  const handleFinalizarServicio = (e, id) => {
    e.preventDefault()
    axios.put(`https://rz-group-backend.herokuapp.com/api/services/${id}`, {
      status: 'completed'
    }).then(res => {
      console.log(res.data)
      router.push('/client/travels')
    }).catch(err => console.log(err))
  }

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
    if (!pago) {
      return alert('Ingrese el monto')
    }
    if (tipoDePago === 'default') {
      return alert('Ingrese el tipo de pago')
    }
    if (tipoDePago === 'Voucher' && !voucher) {
      return alert('Ingrese el voucher')
    } else {
      return alert('Pago realizado')
    }
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
    console.log(servicioEdit)
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

  return (
    <MobileLayout>
      <div className={'md:shadow-2xl bg-[#F7F8FA] h-screen flex items-center flex-col'}>
        <Nav location={'Detalles del Servicio'}/>
        <div className={'p-5 bg-white w-5/6 drop-shadow-2xl rounded-xl flex flex-col justify-evenly'}>
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
          <h1>Descripción</h1>
          <h1>{service?.description}</h1>
        </div>
        <div className={'flex flex-col w-full items-center'}>
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
            <button onClick={(e) => alert('viaje cancelado')}
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
              ? <button
                onClick={(e) => handleFinalizarServicio(e, service._id)}
                className={'mb-1 border-[#5B211F] border-2 w-5/6 rounded-full mt-5 h-[50px] text-[#5B211F] font-bold'}>
                FINALIZAR SERVICIO
              </button>
              : null
          }
          {
            service?.status === 'completed'
              ? <button
                onClick={(e) => setPopUpPago(true)}
                style={popUpPago ? { display: 'none' } : { display: 'block' }}
                className={'mb-1 bg-[#5B211F] w-5/6 rounded-full mt-5 h-[50px] text-white font-bold'}>
                CARGAR PAGO
              </button>
              : null
          }
          {
            popUpPago && service?.status === 'completed'
              ? <div className={'w-5/6 flex flex-col items-center'}>
                <select
                  onChange={(e) => setTipoDePago(e.target.value)}
                  className={'w-full rounded-xl mt-5 h-[50px] font-bold'}>
                  <option value={'default'}>Forma de pago?</option>
                  <option value={'Efectivo'}>Efectivo</option>
                  <option value={'Voucher'}>Voucher</option>
                </select>
                {tipoDePago === 'default'
                  ? null
                  : <input
                    onChange={(e) => setPago(e.target.value)}
                    placeholder={'Monto?'}
                    type={'number'}
                    className={'indent-3 w-full rounded-xl mt-5 h-[50px] font-bold'}/>
                }
                {
                  tipoDePago === 'Efectivo'
                    ? <textarea
                      onChange={(e) => setDescripcionPago(e.target.value)}
                      placeholder={'Descripción'}
                      className={'indent-3 w-full rounded-xl mt-5 h-[100px] font-bold'}/>
                    : null
                }
                {
                  tipoDePago === 'Voucher'
                    ? <div>
                      <input
                        onChange={(e) => setPago(e.target.value)}
                        placeholder={'Empresa Aliada?'}
                        type={'text'}
                        className={'indent-3 w-full rounded-xl mt-5 h-[50px] font-bold'}/>
                      <input
                        onChange={(e) => setPago(e.target.value)}
                        placeholder={'Hotel?'}
                        type={'text'}
                        className={'indent-3 w-full rounded-xl mt-5 h-[50px] font-bold'}/>
                      <input
                        onChange={(e) => setPago(e.target.value)}
                        placeholder={'Firma del cliente'}
                        type={'text'}
                        className={'indent-3 w-full rounded-xl mt-5 h-[50px] font-bold'}/>
                    </div>
                    : null
                }
                <div className={'w-full'}>
                  <button
                    onClick={(e) => handlePago(e, service._id)}
                    className={'bg-green-400 w-4/6 rounded-xl mt-5 h-[50px] font-bold'}>Enviar
                  </button>
                  <button
                    onClick={() => setPopUpPago(false)}
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
