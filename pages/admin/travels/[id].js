/* eslint-disable */
import React, {useState} from 'react'
import MobileLayout from '../../../components/MobileLayout'
import Nav from '../../../components/Nav'
import {Modal, Select, Button} from 'flowbite-react'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import {useSelector} from "react-redux";
import Image from "next/image";
import {useRouter} from "next/router";

export default function travels({data, data3}) {
  const router = useRouter()
  const [drivers, setDrivers] = useState(data3)
  const [selectedDriver, setSelectedDriver] = useState('')
  const [inputPopUp, setInputPopUp] = useState(false)
  const [aprobación, setAprobación] = useState(null)
  console.log(data)
  console.log(data3)

  const asignarViaje = async (id) => {
    if (!selectedDriver) {
      return toast.error('No se ha seleccionado un conductor')
    }
    axios.post(`https://rz-group-backend.herokuapp.com/api/admin/service/driver/${id}`, {
      driverId: selectedDriver
    }).then(res => {
      console.log(res)
      toast.success('Viaje asignado con éxito')
    }).catch(err => {
      console.log(err)
      toast.error('Este conductor, ya tiene un viaje asignado')
    })
  }

  const confirmAction = (id) => {
    console.log(id)
    axios.post(`https://rz-group-backend.herokuapp.com/api/payment/confirmAdmin/${id}`,)
      .then(res => {
        toast.success('Viaje finalizado con éxito')
      }).catch(err => {
      console.log(err)
    })
      .then(res => {
        router.reload()
      })
  }

  return (
    <MobileLayout>
      <div className={'md:shadow-2xl bg-[#F7F8FA] h-fit flex items-center flex-col'}>
        <ToastContainer/>
        <Nav location={'Detalles del Viaje'}/>
        <div className={'p-5 bg-white w-5/6 drop-shadow-2xl rounded-xl flex flex-col justify-evenly'}>
          <div className='flex flex-col justify-center w-full'>
            <h1 className='font-bold'>Datos del cliente: </h1>
            {
              data.client &&
              <>
              <h1>Nombre: {data.client.firstName}</h1>
            <h1>Apellido: {data.client.lastName}</h1>
            <h1>Email: {data.client.email}</h1>
            </>
            }
            
          </div>
          {data.driver.length > 0 ?
            <div className='flex flex-col justify-center w-full mt-8'>
              <h1 className='font-bold'>Datos del conductor: </h1>
              <h1>Nombre: {data.driver[0].firstName}</h1>
              <h1>Apellido: {data.driver[0].lastName}</h1>
              <h1>Email: {data.driver[0].email}</h1>
            </div>
            : null}
          <div className='flex flex-col justify-center w-full mt-8'>
            <h1 className='font-bold'>Datos del viaje: </h1>
            <h1
              className={data.status === 'pending' ? 'bg-yellow-500' : data.status === 'on progress' ? 'bg-orange-500' : data.status === 'completed' ? 'bg-green-500' : 'bg-red-500'}>Estado:
              {data.status === 'pending' ? ' Pendiente' : data.status === 'on progress' ? ' En progreso' : data.status === 'completed' ? ' Completado' : ' Cancelado'} </h1>
            <h1 className='mt-3'>Tipo de servicio: {data?.serviceType}</h1>
            <h1 className='mt-3'>Descripción: {data?.description}</h1>
            <h1 className='mt-3'>Desde: {data?.from}</h1>
            <h1 className='mt-3'>Hasta: {data?.to}</h1>
            <h1 className='mt-3'>Fecha de inicio: {data?.start_date ? data?.start_date.slice(0, 10) : ''} {data?.start_date ? data?.start_date.slice(11, 16) : ''}</h1>
            <h1 className='mt-3'>Duracion: {data?.duration}</h1>
            <h1 className='mt-3'>Numero de vehiculos: {data.number_vehicles}</h1>
          </div>
        </div>
        <div className={'p-5 bg-white mt-5 w-5/6 drop-shadow-2xl rounded-xl flex flex-col justify-evenly'}>
          <h1 className={'text-center'}>PAGO</h1>
          {
            data.status === 'completed' && data.payment.paymentType === 'voucher' && 
            <h1
            className={'text-center font-bold mb-3 text-red-500'}>{data?.payment?.isPaid ? 'PAGO APROBADO POR ADMIN' : 'FALTA APROBAR PAGO'}</h1>
          }
          
          <h1>Monto: ${data?.payment?.paymentAmount}</h1>
          <h1>Tipo: {data?.payment?.paymentType}</h1>
          <h1>Descripción: {data?.payment?.payment_description}</h1>
          {
            data?.payment?.client_signature ? 
            <Image src={data?.payment?.client_signature} alt={'client sig'} width={300} height={150}/>
            : null
          }
          
        </div>
        <div className={'flex flex-col w-full items-center'}>
          { data?.payment?.paymentType === 'voucher' && !data.payment.isPaid && data.status === 'completed' ?
            <button
            onClick={() => confirmAction(data.payment._id)}
            className={'bg-green-400 w-5/6 rounded-xl mt-5 h-[50px] font-bold'}>APROBAR PAGO
          </button>
          : null
          }
          <button
            onClick={() => setInputPopUp(true)}
            className={'bg-blue-500 w-5/6 rounded-xl mt-5 h-[50px] text-white font-bold'}>ASIGNAR VIAJE
          </button>
          <Modal
            show={inputPopUp}
            size={'sm'}
            onClose={() => setInputPopUp(false)}
          >
            <Modal.Header className='text-2xl font-bold'>
              Asignar viaje
            </Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                <Select
                  id="driver"
                  required={true}
                  value={selectedDriver}
                  onChange={(e) => setSelectedDriver(e.target.value)}
                >
                  <option value="">Selecciona un conductor</option>
                  {drivers.map((driver, i) => (
                    <option key={i} value={driver._id}>{driver.firstName} {driver.lastName}</option>
                  ))}
                </Select>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => asignarViaje(data._id)} color='success'>
                Asignar
              </Button>
              <Button onClick={() => setInputPopUp(false)} color='failure'>
                Cancelar
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </MobileLayout>
  )
}

export async function getServerSideProps(context) {
  const {id} = context.query
  const res = await fetch(`https://rz-group-backend.herokuapp.com/api/services/${id}`)
  const res2 = await fetch('https://rz-group-backend.herokuapp.com/api/user?skip=0&limit=100')
  const data = await res.json()
  const data2 = await res2.json()
  const data3 = data2.data.filter(driver => driver.roles[0].name === 'driver' && driver.isAproved === 'aproved')
  return {
    props: {
      data,
      data3
    }
  }
}
