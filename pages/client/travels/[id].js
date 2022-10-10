import React, { useEffect, useState } from 'react'
import MobileLayout from '../../../components/MobileLayout'
import Nav from '../../../components/Nav'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { deleteService, getServiceId } from '../../../Redux/Actions/servicesActions'
import { PDFDownloadLink } from '@react-pdf/renderer'
import FuecTemplate from '../../../components/FuecTemplate/FuecTemplate'
export default function users ({ data }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const { id } = router.query
  const { service, user } = useSelector(state => state)
  const [popUpAdd, setPopUpAdd] = useState(false)
  const [popUpMOD, setPopUpMOD] = useState(false)
  useEffect(() => {
    if (id) {
      console.log(id)
      return dispatch(getServiceId(id))
    }
  }, [id])
  /*  _id(pin):"6336223b4af5372b09f8049d"
  status(pin):"pending"
  number_vehicles(pin):"4"
  driver(pin):
  _id(pin):"6325dfd6bfd56e06fd654b3f"
  firstName(pin):"Marcelo"
  lastName(pin):"Godoy"
  email(pin):"marce.godoybaquero@gmail.com"
  vehicle(pin):
  createdAt(pin):"2022-09-29T22:54:51.771Z" */
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
              ? <PDFDownloadLink document={<FuecTemplate name={user.name} service={service} />} fileName='fuec.pdf' className='w-full flex justify-center items-center'>
              <button
                        className={'mb-1 bg-[#5B211F] w-5/6 rounded-full mt-5 h-[50px] text-white font-bold'}>DESCARGAR
                FUEC
              </button>
            </PDFDownloadLink>
              : <button onClick={() => deleteService(service._id)}
              className={'bg-red-400 w-5/6 rounded-xl mt-5 h-[50px] font-bold'}>ELIMINAR
                </button>
          }
          {
            !popUpMOD
              ? <button onClick={() => setPopUpMOD(true)}
                        className={'bg-blue-400 w-5/6 rounded-xl mt-5 h-[50px] font-bold'}>MODIFICAR</button>
              : <div className={'w-5/6 flex flex-col items-center'}>
                <span className={'bg-gray-300 w-full h-0.5 mt-5'}></span>
                <input className={'indent-3 w-full rounded-xl mt-5 h-[50px] font-bold'} placeholder={'Origen'}/>
                <input className={'indent-3 w-full rounded-xl mt-5 h-[50px] font-bold'} placeholder={'Destino'}/>
                <input className={'indent-3 w-full rounded-xl mt-5 h-[50px] font-bold'} placeholder={'Fecha de Inicio'}/>
                <input className={'indent-3 w-full rounded-xl mt-5 h-[50px] font-bold'}
                       placeholder={'Fecha de Finalización'}/>
                <div className={'w-full'}>
                  <button className={'bg-blue-400 w-4/6 rounded-xl mt-5 h-[50px] font-bold'}>Guardar</button>
                  <button onClick={() => setPopUpMOD(false)}
                          className={'bg-red-400 w-2/6 rounded-xl mt-5 h-[50px] font-bold'}>Cancelar
                  </button>
                </div>

              </div>
          }
          {
            !popUpAdd
              ? <button onClick={() => setPopUpAdd(true)}
                        className={'bg-green-400 w-5/6 rounded-xl mt-5 h-[50px] font-bold'}>AGREGAR VEHÍCULOS
                EXTRA</button>
              : <div className={'w-5/6 flex flex-col'}>
                <span className={'bg-gray-300 w-full h-0.5 mt-5'}></span>
                <input
                  onChange={(e) => console.log(e.target.value)}
                  placeholder={'Cantidad de vehículos extra'}
                  type={'number'}
                  className={'indent-3 w-full rounded-xl mt-5 h-[50px] font-bold'}/>
                <div>
                  <button
                    onClick={() => console.log('hola')}
                    className={'bg-green-400 w-4/6 rounded-xl mt-5 h-[50px] font-bold'}>Enviar
                  </button>
                  <button
                    onClick={() => setPopUpAdd(false)}
                    className={'bg-red-400 w-2/6 rounded-xl mt-5 h-[50px] font-bold'}>Cancelar
                  </button>
                </div>
              </div>
          }
        </div>
      </div>
    </MobileLayout>
  )
}
