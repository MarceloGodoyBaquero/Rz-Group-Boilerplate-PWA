import React, { useEffect, useState } from 'react'
import MobileLayout from '../../../components/MobileLayout'
import Nav from '../../../components/Nav'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { deleteService } from '../../../Redux/Actions/servicesActions'

export default function users ({ data }) {
  const dispatch = useDispatch()
  const router = useRouter()
  const [popUpAdd, setPopUpAdd] = useState(false)
  const [popUpMOD, setPopUpMOD] = useState(false)

  return (
    <MobileLayout>
      <div className={'md:shadow-2xl bg-[#F7F8FA] h-screen flex items-center flex-col'}>
        <Nav location={'Detalles del Vehículo'}/>
        <div
          className={'font-bold mb-3 p-5 bg-white w-5/6 drop-shadow-2xl rounded-xl flex items-center flex-col justify-evenly'}>
          <h1>Propietario: {data.owner.firstName} {data.owner.lastName}</h1>
        </div>
        <div className={'p-5 bg-white w-5/6 drop-shadow-2xl rounded-xl flex flex-col justify-evenly'}>
          <h1>Marca: {data.brand}</h1>
          <h1>Modelo: {data.model}</h1>
          <h1>Tipo: {data.type}</h1>
          <h1>Capacidad: {data.capacity} pasajeros</h1>
          <hr className={'m-3'}/>
          <h1>Placa: {data.carPlate}</h1>
          <h1>Año: {data.year}</h1>
          <h1>Categoría: {data.category.toUpperCase()}</h1>
          <hr className={'m-3'}/>
          <h1>Numero Interno: {data.numero_interno}</h1>
          <h1>Tarjeta de Operación: {data.tarjeta_operacion}</h1>
        </div>
        <div
          className={'font-bold mt-3 p-5 bg-white w-5/6 drop-shadow-2xl rounded-xl flex items-center flex-col justify-evenly'}>
          <h1>ESTADO: {data.isAproved === 'aproved' ? 'APROBADO' : data.isAproved === 'notAproved' ? 'NO APROBADO' : 'PENDIENTE'}</h1>
        </div>
        <div className={'flex flex-col w-full items-center'}>
          <button onClick={() => router.push('/VehicleValidations')}
                  className={'bg-green-400 w-5/6 rounded-full mt-10 mb-5 h-[50px] font-bold'}>CARGAR DOCUMENTACIÓN
          </button>
          <button onClick={() => console.log('asd')}
                  className={'bg-red-400 w-5/6 rounded-xl mt-5 h-[50px] font-bold'}>ELIMINAR
          </button>
          {
            !popUpMOD
              ? <button onClick={() => setPopUpMOD(true)}
                        className={'bg-blue-400 w-5/6 rounded-xl mt-5 h-[50px] font-bold'}>MODIFICAR</button>
              : <div className={'w-5/6 flex flex-col items-center'}>
                <span className={'bg-gray-300 w-full h-0.5 mt-5'}></span>
                <input className={'indent-3 w-full rounded-xl mt-5 h-[50px] font-bold'} placeholder={'Marca'}/>
                <input className={'indent-3 w-full rounded-xl mt-5 h-[50px] font-bold'} placeholder={'Modelo'}/>
                <div className={'w-full'}>
                  <button className={'bg-blue-400 w-4/6 rounded-xl mt-5 h-[50px] font-bold'}>Guardar</button>
                  <button onClick={() => setPopUpMOD(false)}
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
