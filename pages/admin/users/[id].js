import React from 'react'
import MobileLayout from '../../../components/MobileLayout'
import Nav from '../../../components/Nav'
import axios from 'axios'
import Image from 'next/image'

export default function users ({ data }) {
  console.log(data)

  const deleteUser = async (id) => {
    console.log(id)
    axios.delete('https://rz-group-backend.herokuapp.com/api/user/' + id)
      .then(res => {
        console.log(res.data)
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
              : <h2>Pendiente...</h2>}
            <h2 className={'text-center'}>Curso Primeros Auxilios:</h2>
            {data.curso_aux
              ? <a className={'flex justify-center items-center'} href={data.curso_aux}>
                <div className={'w-4/6'}>
                <Image src={data.curso_aux} layout={'responsive'} height={500} width={600}/>
                </div>
              </a>
              : <h2>Pendiente...</h2>}
            <h2 className={'text-center'}>Foto Frontal ID:</h2>
            {data.idPictureFront
              ? <a className={'flex justify-center items-center'} href={data.idPictureFront}>
                <div className={'w-4/6'}>
                <Image src={data.idPictureFront} layout={'responsive'} height={500} width={600}/>
                </div>
              </a>
              : <h2>Pendiente...</h2>}
            <h2 className={'text-center'}>Foto Trasera ID:</h2>
            {data.idPictureBack
              ? <a className={'flex justify-center items-center'} href={data.idPictureBack}>
                <div className={'w-4/6'}>
                <Image src={data.idPictureBack} layout={'responsive'} height={500} width={600}/>
                </div>
              </a>
              : <h2>Pendiente...</h2>}
            <h2 className={'text-center'}>Foto Frontal Licencia:</h2>
            {data.licensePictureFront
              ? <a className={'flex justify-center items-center'} href={data.licensePictureFront}>
                <div className={'w-4/6'}>
                <Image src={data.licensePictureFront} layout={'responsive'} height={500} width={600}/>
                </div>
              </a>
              : <h2>Pendiente...</h2>}
          </div>
        </div>
        <div className={'flex flex-col w-full items-center'}>
          <button
            onClick={() => deleteUser(data._id)}
            className={'bg-red-400 w-5/6 rounded-xl mt-5 h-[50px] font-bold'}>ELIMINAR
          </button>
          <button className={'bg-green-400 w-5/6 rounded-xl mt-5 h-[50px] font-bold'}>APROBAR</button>
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
