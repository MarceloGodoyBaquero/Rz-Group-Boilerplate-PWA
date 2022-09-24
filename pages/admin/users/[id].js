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
    axios.delete('https://rz-group-backend.herokuapp.com/api/user/' + id)
      .then(res => {
        console.log(res.data)
        router.push('/admin/users')
      })
  }
  const aprobateUser = async (id) => {
    console.log(id)
    axios.post('https://rz-group-backend.herokuapp.com/api/admin/approve/' + id)
      .then(res => {
        console.log(res)
        router.reload()
      })
  }
  const desaprobateUser = async (id) => {
    console.log(id)
    axios.post('https://rz-group-backend.herokuapp.com/api/admin/reject/' + id, {
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
          <h1>Nombre: {data.firstName}</h1>
          <h1>Apellido: {data.lastName}</h1>
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
          <h1>ID: {data.idNumber}</h1>
          <h1>Email: {data.email}</h1>
          <h1>Teléfono: {data.phoneNumber}</h1>
          <h1>Roles: {data.roles.map(r => r.name).join(', ')}</h1>
          <div className={'w-full flex flex-col'}>
            <h2 className={'text-center'}>Curso ESNA:</h2>
            {data.curso_ESNA
              ? <a className={'flex justify-center items-center'} href={data.curso_ESNA}>
                <div className={'w-4/6'}>
                  <Image src={data.curso_ESNA} layout={'responsive'} height={500} width={600}/>
                </div>
              </a>
              : <h2 className={'text-center'}>Pendiente...</h2>}
            <h2 className={'text-center'}>Curso Primeros Auxilios:</h2>
            {data.curso_aux
              ? <a className={'flex justify-center items-center'} href={data.curso_aux}>
                <div className={'w-4/6'}>
                  <Image src={data.curso_aux} layout={'responsive'} height={500} width={600}/>
                </div>
              </a>
              : <h2 className={'text-center'}>Pendiente...</h2>}
            <h2 className={'text-center'}>Foto Frontal Cedula:</h2>
            {data.idPictureFront
              ? <a className={'flex justify-center items-center'} href={data.idPictureFront}>
                <div className={'w-4/6'}>
                  <Image src={data.idPictureFront} layout={'responsive'} height={500} width={600}/>
                </div>
              </a>
              : <h2 className={'text-center'}>Pendiente...</h2>}
            <h2 className={'text-center'}>Foto Trasera Cedula:</h2>
            {data.idPictureBack
              ? <a className={'flex justify-center items-center'} href={data.idPictureBack}>
                <div className={'w-4/6'}>
                  <Image src={data.idPictureBack} layout={'responsive'} height={500} width={600}/>
                </div>
              </a>
              : <h2 className={'text-center'}>Pendiente...</h2>}
            <h2 className={'text-center'}>Foto Frontal Licencia:</h2>
            {data.licensePictureFront
              ? <a className={'flex justify-center items-center'} href={data.licensePictureFront}>
                <div className={'w-4/6'}>
                  <Image src={data.licensePictureFront} layout={'responsive'} height={500} width={600}/>
                </div>
              </a>
              : <h2 className={'text-center'}>Pendiente...</h2>}
            <h2 className={'text-center'}>Foto Trasera Licencia:</h2>
            {data.licensePictureBack
              ? <a className={'flex justify-center items-center'} href={data.licensePictureBack}>
                <div className={'w-4/6'}>
                  <Image src={data.licensePictureBack} layout={'responsive'} height={500} width={600}/>
                </div>
              </a>
              : <h2 className={'text-center'}>Pendiente...</h2>}
            <h2 className={'text-center'}>Número de Licencia:</h2>
            {data.nro_license
              ? <h2 className={'text-center'}>{data.nro_license}</h2>
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
                  className={'bg-yellow-400 w-1/6 rounded-xl mt-5 h-[50px] font-bold'}>Enviar</button>
                <button
                  onClick={() => setInputPopUp(false)}
                  className={'bg-red-400 w-1/6 rounded-xl mt-5 h-[50px] font-bold'}>Cancelar</button>
              </div>
              : data.isAproved === 'inReview' && <button
                onClick={() => setInputPopUp(true)}
                className={'bg-yellow-400 w-5/6 rounded-xl mt-5 h-[50px] font-bold'}>DESAPROBAR
              </button>
          }
          <button className={'bg-orange-400 w-5/6 rounded-xl mt-5 h-[50px] font-bold'}>REPORTAR</button>
          <button className={'bg-blue-400 w-5/6 rounded-xl mt-5 h-[50px] font-bold'}>MODIFICAR</button>
        </div>
      </div>
    </MobileLayout>
  )
}

export async function getServerSideProps (context) {
  const res = await fetch('https://rz-group-backend.herokuapp.com/api/user/' + context.query.id)
  const data = await res.json()
  console.log(data)
  return {
    props: {
      data
    }
  }
}
