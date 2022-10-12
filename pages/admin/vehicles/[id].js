import React, { useState } from 'react'
import MobileLayout from '../../../components/MobileLayout'
import Nav from '../../../components/Nav'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function users ({ data }) {
  const router = useRouter()
  const [inputPopUp, setInputPopUp] = useState(false)
  const [reason, setReason] = useState('')

  console.table(data)

  const deleteUser = async (id) => {
    console.log(id)
    axios.delete('https://rz-group-backend.herokuapp.com/api/vehicles/' + id)
      .then(res => {
        console.log(res.data)
        router.push('/admin/vehicles')
      }).catch(err => {
        console.log(err)
      })
  }
  const aprobateUser = async (id) => {
    console.log(id)
    axios.post('https://rz-group-backend.herokuapp.com/api/admin/vehicle/approve/' + id)
      .then(res => {
        console.log(res)
        router.reload()
      })
  }
  const desaprobateUser = async (id) => {
    console.log(id)
    axios.post('https://rz-group-backend.herokuapp.com/api/admin/vehicle/reject/' + id, {
      message: reason
    })
      .then(res => {
        console.log(res)
        router.reload()
      })
  }

  return (
    <MobileLayout>
      <div className={'md:shadow-2xl bg-[#F7F8FA] h-fit flex items-center flex-col'}>
        <Nav location={'Detalles de Usuario'}/>
        <div className={'p-5 bg-white w-5/6 drop-shadow-2xl rounded-xl flex flex-col justify-evenly'}>
          <h1>Marca: {data.brand.toUpperCase()}</h1>
          <h1>Modelo: {data.model.toUpperCase()}</h1>
          <h1>Año: {data.year}</h1>
          <div>
            {
              data.isAproved === 'notAproved' ? <h1 className={'bg-red-500'}>Estado: No aprobado</h1> : null
            }
            {
              data.isAproved === 'inReview' ? <h1 className={'bg-orange-500'}>Estado: En revisión</h1> : null
            }
            {
              data.isAproved === 'aproved' ? <h1 className={'bg-green-500'}>Estado: Aprobado</h1> : null
            }
          </div>
          <h1>Matricula: {data.carPlate.toUpperCase()}</h1>
          <h1>Tipo: {data.type}</h1>
          <h1>Categoria: {data.category}</h1>
          <h1>Capacidad: {data.capacity}</h1>
          <h1 onClick={() => router.push(`/admin/users/${data.owner?._id}`)}
              className='hover:text-blue-500 cursor-pointer'>Dueño: {data.owner.firstName + ' ' + data.owner.lastName}</h1>
          <div className={'w-full flex flex-col'}>
            <h2 className={'text-center'}>Revisión Tecnomecánica:</h2>
            {data.revision_tecnomecanica
              ? <a className={'flex justify-center items-center'} href={data.revision_tecnomecanica}>
                <div className={'w-4/6'}>
                  <Image src={data.revision_tecnomecanica} layout={'responsive'} height={500} width={600}/>
                </div>
              </a>
              : <h2 className={'text-center'}>Pendiente...</h2>}
            <h2 className={'text-center'}>Poliza Contractual:</h2>
            {data.poliza_contraactual
              ? <a className={'flex justify-center items-center'} href={data.poliza_contraactual}>
                <div className={'w-4/6'}>
                  <Image src={data.poliza_contraactual} layout={'responsive'} height={500} width={600}/>
                </div>
              </a>
              : <h2 className={'text-center'}>Pendiente...</h2>}
            <h2 className={'text-center'}>Fecha de expedición Poliza Contractual:</h2>
            {data.fecha_exp_poliza
              ? <h2 className={'text-center font-bold'}>{
                data.fecha_exp_poliza.split('T')[0]
              }</h2>
              : <h2 className={'text-center'}>Pendiente...</h2>}
            <h2 className={'text-center'}>Fecha de Vencimiento Poliza Contractual:</h2>
            {data.fecha_ven_poliza
              ? <h2 className={'text-center font-bold'}>{data.fecha_ven_poliza.split('T')[0]}</h2>
              : <h2 className={'text-center'}>Pendiente...</h2>}
            <h2 className={'text-center'}>SOAT:</h2>
            {data.soat
              ? <a className={'flex justify-center items-center'} href={data.soat}>
                <div className={'w-4/6'}>
                  <Image src={data.soat} layout={'responsive'} height={500} width={600}/>
                </div>
              </a>
              : <h2 className={'text-center'}>Pendiente...</h2>}
            <h2 className={'text-center'}>Fecha de expedición SOAT:</h2>
            {data.fecha_exp_soat
              ? <h2 className={'text-center font-bold'}>{data.fecha_exp_soat.split('T')[0]}</h2>
              : <h2 className={'text-center'}>Pendiente...</h2>}
            <h2 className={'text-center'}>Fecha de Vencimiento SOAT:</h2>
            {data.fecha_ven_soat
              ? <h2 className={'text-center font-bold'}>{data.fecha_ven_soat.split('T')[0]}</h2>
              : <h2 className={'text-center'}>Pendiente...</h2>}
            <h2 className={'text-center'}>Foto Frontal Tarjeta de Propiedad:</h2>
            {data.propertyCardFront
              ? <a className={'flex justify-center items-center'} href={data.propertyCardFront}>
                <div className={'w-4/6'}>
                  <Image src={data.propertyCardFront} layout={'responsive'} height={500} width={600}/>
                </div>
              </a>
              : <h2 className={'text-center'}>Pendiente...</h2>}
            <h2 className={'text-center'}>Foto Trasera Tarjeta de Propiedad:</h2>
            {data.propertyCardBack
              ? <a className={'flex justify-center items-center'} href={data.propertyCardBack}>
                <div className={'w-4/6'}>
                  <Image src={data.propertyCardBack} layout={'responsive'} height={500} width={600}/>
                </div>
              </a>
              : <h2 className={'text-center'}>Pendiente...</h2>}
            <h2 className={'text-center'}>Número Interno:</h2>
            {data.numero_interno
              ? <h2 className={'text-center'}>{data.numero_interno}</h2>
              : <h2 className={'text-center'}>Pendiente...</h2>}
            <h2 className={'text-center'}>Número de Tarjeta de Operación:</h2>
            {data.tarjeta_operacion
              ? <h2 className={'text-center'}>{data.tarjeta_operacion}</h2>
              : <h2 className={'text-center'}>Pendiente...</h2>}
          </div>
        </div>
        <div className={'flex flex-col w-full items-center'}>
          <button
            onClick={() => deleteUser(data._id)}
            className={'bg-red-400 w-5/6 rounded-xl mt-5 h-[50px] font-bold'}>ELIMINAR
          </button>
          {data.isAproved === 'inReview' && <button
            onClick={() => aprobateUser(data._id)}
            className={'bg-green-400 w-5/6 rounded-xl mt-5 h-[50px] font-bold'}>APROBAR
          </button>}
          {
            inputPopUp
              ? <div className={'w-5/6'}>
                <input
                  onChange={(e) => setReason(e.target.value)}
                  placeholder={'Razón'}
                  className={'indent-3 w-4/6 rounded-xl mt-5 h-[50px] font-bold'}/>
                <button
                  onClick={() => desaprobateUser(data._id)}
                  className={'bg-yellow-400 w-1/6 rounded-xl mt-5 h-[50px] font-bold'}>Enviar
                </button>
                <button
                  onClick={() => setInputPopUp(false)}
                  className={'bg-red-400 w-1/6 rounded-xl mt-5 h-[50px] font-bold'}>Cancelar
                </button>
              </div>
              : data.isAproved === 'inReview' && <button
              onClick={() => setInputPopUp(true)}
              className={'bg-yellow-400 w-5/6 rounded-xl mt-5 h-[50px] font-bold'}>DESAPROBAR
            </button>
          }
          <button onClick={() => setInputPopUp(true)}
                  className={'bg-orange-400 w-5/6 rounded-xl mt-5 h-[50px] font-bold'}>REPORTAR
          </button>
          {/* <button className={'bg-blue-400 w-5/6 rounded-xl mt-5 h-[50px] font-bold'}>MODIFICAR</button> */}
        </div>
      </div>
    </MobileLayout>
  )
}

export async function getServerSideProps (context) {
  const res = await fetch('https://rz-group-backend.herokuapp.com/api/vehicles/' + context.query.id)
  const data = await res.json()
  console.log(data)
  return {
    props: {
      data
    }
  }
}
