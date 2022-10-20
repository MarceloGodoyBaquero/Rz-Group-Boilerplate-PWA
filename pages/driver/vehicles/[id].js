// eslint-disable-next-line
import React, {useEffect, useState} from 'react'
import MobileLayout from '../../../components/MobileLayout'
import Nav from '../../../components/Nav'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { deleteVehicle } from '../../../Redux/Actions/vehiclesActions'
import Select from 'react-select'
import axios from 'axios'

export default function users ({ data }) {
  const dispatch = useDispatch()
  const router = useRouter()
  const { id } = router.query
  const { user } = useSelector(state => state)
  console.log(data)
  // eslint-disable-next-line
  const [popUpAdd, setPopUpAdd] = useState(false)
  const [popUpMOD, setPopUpMOD] = useState(false)
  const [tab, setTab] = useState(0)
  const [conductores, setConductores] = useState([])
  const [input, setInput] = useState({
    vehicles: [id],
    idDriver: ''
  })
  // && driver?.isAproved === 'aproved'

  const autorizacionTab = () => {
    setTab(1)
    axios.get('https://rz-group-backend.herokuapp.com/api/user?skip=0&limit=100')
      .then(res => {
        console.log(res.data.data)
        setConductores(res?.data?.data?.filter(driver => driver?.roles[0]?.name === 'driver' && driver?.isAproved === 'aproved').map(e => {
          return {
            value: e?._id,
            label: e?.firstName + ' ' + e?.lastName + ' - (' + e?.idNumber + ')'
          }
        }))
      }).catch(err => {
        console.log(err)
      })
  }
  // http://localhost:3001/api/user/authDrivers/:id

  const quitarAutorizacionTab = () => {
    setTab(2)
    axios.get(`https://rz-group-backend.herokuapp.com/api/user/authDrivers/${user.id}`)
      .then(res => {
        console.log('asd', res.data)
        setConductores(res?.data?.map(e => {
          return {
            value: e?._id,
            label: e?.firstName + ' ' + e?.lastName + ' - (' + e?.idNumber + ')'
          }
        }))
      }).catch(err => {
        console.log(err)
      })
  }

  const desautorizacion = (e) => {
    e.preventDefault()
    console.log(input)
    axios.post(`https://rz-group-backend.herokuapp.com/api/user/unAuthDriver/${user.id}`, input)
      .then(res => {
        console.log(res)
        setTab(0)
      }).catch(err => {
        console.log(err)
      })
  }

  const autorizacion = (e) => {
    e.preventDefault()
    console.log(input)
    axios.post(`https://rz-group-backend.herokuapp.com/api/user/addDriver/${user.id}`, input)
      .then(res => {
        console.log(res)
        setTab(0)
      }).catch(err => {
        console.log(err)
      })
  }

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
          className={`font-bold mt-3 p-5 w-5/6 drop-shadow-2xl rounded-xl flex items-center flex-col justify-evenly ${data.isAproved === 'aproved' ? 'bg-green-400' : data.isAproved === 'inReview' ? 'bg-yellow-300' : 'bg-red-400'}`}>
          <h1>ESTADO: {data.isAproved === 'aproved' ? 'APROBADO' : data.isAproved === 'notAproved' ? 'NO APROBADO' : 'PENDIENTE'}</h1>
        </div>
        <div className={'flex flex-col w-full items-center'}>
          {
            data.isAproved !== 'aproved'
              ? <button onClick={() => router.push('/VehicleValidation/' + data._id)}
                        className={'bg-green-400 w-5/6 rounded-full mt-10 mb-5 h-[50px] font-bold'}>CARGAR DOCUMENTACIÓN
              </button>
              : null
          }
          {
            data.isAproved === 'aproved'
              ? <button onClick={() => autorizacionTab()}
                        className={tab === 1 ? 'bg-blue-900 w-5/6 rounded-xl mt-10 mb-5 h-[50px] font-bold text-white' : 'bg-blue-500 w-5/6 rounded-xl mt-10 mb-5 h-[50px] font-bold text-white'}>AUTORIZAR
                CONDUCTOR
              </button>
              : null
          }
          {
            tab === 1
              ? <div className={'w-full w-5/6 flex flex-row items-center justify-center'}>
                <Select options={conductores}
                        className={'w-full mr-2'}
                        onChange={(e) => setInput({ ...input, idDriver: e.value })}/>
                <button onClick={(e) => autorizacion(e)}
                        className={'bg-green-500 w-2/6 rounded-xl h-[50px] font-bold text-white'}>AUTORIZAR
                </button>
              </div>
              : null
          }
          {
            data.isAproved === 'aproved'
              ? <button onClick={() => quitarAutorizacionTab()}
                        className={tab === 2 ? 'bg-blue-900 w-5/6 rounded-xl mt-10 mb-5 h-[50px] font-bold text-white' : 'bg-blue-500 w-5/6 rounded-xl mt-10 mb-5 h-[50px] font-bold text-white'}>QUITAR
                AUTORIZACIÓN
              </button>
              : null
          }
          {
            tab === 2
              ? <div className={'w-full w-5/6 flex flex-row items-center justify-center'}>
                <Select options={conductores}
                        className={'w-full mr-2'}
                        onChange={(e) => setInput({ ...input, idDriver: e.value })}/>
                <button onClick={(e) => desautorizacion(e)}
                        className={'bg-red-500 w-3/6 rounded-xl h-[50px] font-bold text-white'}>DESAUTORIZAR
                </button>
              </div>
              : null
          }
          <button onClick={() => dispatch(deleteVehicle(data._id, router))}
                  className={'bg-red-400 w-5/6 rounded-xl mt-5 h-[50px] font-bold'}>ELIMINAR
          </button>
          {
            !popUpMOD
              ? data.isAproved === 'aproved'
                ? null
                : <button onClick={() => setPopUpMOD(true)}
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
