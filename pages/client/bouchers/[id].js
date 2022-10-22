import React from 'react'
import MobileLayout from '../../../components/MobileLayout'
import Nav from '../../../components/Nav'
import { useRouter } from 'next/router'
import Image from 'next/image'
// eslint-disable-next-line
import {deleteService} from '../../../Redux/Actions/servicesActions'
import axios from 'axios'
import { useSelector } from 'react-redux'

export default function users (data) {
  console.log(data)
  const { user } = useSelector(state => state)
  const router = useRouter()
  const { id } = router.query

  const confirmAction = () => {
    if (user.roles === 'client') {
      axios.post(`https://rz-group-backend.herokuapp.com/api/payment/confirmClient/${id}`)
        .then(res => {
          console.log(res)
          console.log(user.roles)
          return alert('pago confirmado')
        }).catch(err => {
          console.log(err)
        }).then(res => {
          router.reload()
        })
    } else if (user.roles === 'driver') {
      return axios.post(`https://rz-group-backend.herokuapp.com/api/payment/confirmDriver/${id}`)
        .then(res => {
          console.log(res)
          console.log(res.data)
        }).catch(err => {
          console.log(err)
        })
    }
  }
  return (
    <MobileLayout>
      <div className={'md:shadow-2xl bg-[#F7F8FA] h-fit flex items-center flex-col'}>
        <Nav location={'Detalles del Pago'}/>
        { data?.data?.paymentType !== 'cash'
          ? <div className={'mt-5 p-5 bg-white w-5/6 drop-shadow-2xl rounded-xl flex flex-col justify-evenly'}>
          {
            data?.data?.isPaid
              ? <h1 className={'text-center text-green-500 font-bold'}>SERVICIO PAGADO</h1>
              : <h1 className={'text-center font-bold text-orange-500'}>SERVICIO PENDIENTE DE PAGO</h1>
          }
          <hr/>
          {
            data?.data?.driver_confirm
              ? <h3 className={'text-center text-[14px] text-green-500 font-bold'}>CONFIRMADO POR ADMIN</h3>
              : <h3 className={'text-center font-bold text-[14px] text-orange-500'}>ADMIN CONFIRMACIÓN PENDIENTE </h3>
          }
          <hr/>
          {
            data?.data?.client_confirm === true
              ? <h3 className={'text-center text-[14px] text-green-500 font-bold'}>CONFIRMADO POR CLIENTE</h3>
              : <h3 className={'text-center font-bold text-[14px] text-orange-500'}>CLIENTE CONFIRMACIÓN PENDIENTE</h3>
          }
        </div>
          : null }
        <div className={'mt-5 p-5 bg-white w-5/6 drop-shadow-2xl rounded-xl flex flex-col justify-evenly'}>
          <h1 className={'text-center font-bold'}>CLIENTE</h1>
          <h1>Nombre: {data?.data?.client?.firstName} {data?.data?.client?.lastName}</h1>
          <h1>Id: {data?.data?.client?.idNumber}</h1>
          <h1>Tel: {data?.data?.client?.phoneNumber}</h1>
          <h1>Email: {data?.data?.client?.email}</h1>
          <hr className={'mt-2'}/>
          {
            data?.data?.client_signature
              ? <label className={'text-center mt-2'}>
                Firma:
                <Image src={data?.data?.client_signature} width={300} height={150} alt={'cliente-firma'}/>
              </label>
              : null
          }
        </div>
        {
          data?.data?.client?.companyAllied
            ? <div className={'mt-5 p-5 bg-white w-5/6 drop-shadow-2xl rounded-xl flex flex-col justify-evenly'}>
              <h1 className={'text-center font-bold'}>EMPRESA ALIADA</h1>
              <h1>Nombre: {data?.data?.client?.companyAllied?.name}</h1>
              <h1>{data?.data?.client?.companyAllied?.Id_type}: {data?.data?.client?.companyAllied?.Id_number}</h1>
              <h1>Tel: {data?.data?.client?.companyAllied?.phone}</h1>
              <h1>Email: {data?.data?.client?.companyAllied?.email}</h1>
              <h1>Dirección: {data?.data?.client?.companyAllied?.address}</h1>
            </div>
            : null
        }
        <div className={'mt-5 p-5 bg-white w-5/6 drop-shadow-2xl rounded-xl flex flex-col justify-evenly'}>
          <h1 className={'text-center font-bold'}>SERVICIO</h1>
          <h1>Precio: ${data?.data?.paymentAmount}</h1>
          <h1>Forma de pago: {data?.data?.paymentType}</h1>
          <hr/>
          <h1>Cantidad de vehículos: {data?.data?.number_vehicles}</h1>
          <h1>Tipo: {data?.data?.serviceType}</h1>
          <h1>Categoría: {data?.data?.category}</h1>
          <hr/>
          <h1>Inicio: {data?.data?.start_date?.slice(0, 10)}</h1>
          <h1>Final: {data?.data?.end_date?.slice(0, 10)}</h1>
          <h1>Origen: {data?.data?.from}</h1>
          <h1>Destino: {data?.data?.to}</h1>
          <hr/>
          <h1>Descipción servicio: {data?.data?.description}</h1>
        </div>
        <div className={'mt-5 p-5 bg-white w-5/6 drop-shadow-2xl rounded-xl flex flex-col justify-evenly'}>
          <h1 className={'text-center font-bold'}>CONDUCTOR</h1>
          <h1>Nombre: {data?.data?.driver?.firstName} {data?.data?.driver?.lastName}</h1>
          <h1>Id: {data?.data?.driver?.idNumber}</h1>
          <h1>Licencia: {data?.data?.driver?.nro_license}</h1>
          <h1>Email: {data?.data?.driver?.email}</h1>
          <hr/>
          <h1>Descripción extras: {data?.data?.payment_description}</h1>
        </div>
        <div className={'flex flex-col w-full items-center'}>
          { data?.data?.paymentType !== 'cash'
            ? <button onClick={() => confirmAction()}
                   className={'bg-blue-400 w-5/6 rounded-xl mt-5 mb-5 h-[50px] font-bold'}>
            CONFIRMAR PAGO
          </button>
            : null}
        </div>
      </div>
    </MobileLayout>
  )
}

export async function getServerSideProps (context) {
  const { id } = context.query
  const res = await fetch(`https://rz-group-backend.herokuapp.com/api/payment/${id}`)
  const data = await res.json()
  return {
    props: {
      data
    }
  }
}
