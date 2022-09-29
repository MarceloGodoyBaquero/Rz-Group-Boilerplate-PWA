import React, {useState} from 'react'
import MobileLayout from '../../../components/MobileLayout'
import Nav from '../../../components/Nav'
import {useRouter} from 'next/router'
import {useDispatch} from "react-redux";
import {deleteService} from "../../../Redux/Actions/servicesActions";

export default function users(props) {
  const router = useRouter()
  const dispatch = useDispatch()
  const [popUpAdd, setPopUpAdd] = useState(false)
  const [popUpMOD, setPopUpMOD] = useState(false)
  return (
    <MobileLayout>
      <div className={'md:shadow-2xl bg-[#F7F8FA] h-screen flex items-center flex-col'}>
        <Nav location={'Detalles del Servicio'}/>
        <div className={'p-5 bg-white w-5/6 drop-shadow-2xl rounded-xl flex flex-col justify-evenly'}>
          <h1>Hola</h1>
        </div>
        <div className={'flex flex-col w-full items-center'}>
          <button onClick={() => dispatch(deleteService(props.params.id))}
                  className={'bg-red-400 w-5/6 rounded-xl mt-5 h-[50px] font-bold'}>ELIMINAR
          </button>
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
              :
              <div className={'w-5/6'}>
                <input
                  onChange={(e) => console.log(e.target.value)}
                  placeholder={'Cantidad de vehículos extra'}
                  type={'number'}
                  className={'indent-3 w-4/6 rounded-xl mt-5 h-[50px] font-bold'}/>
                <button
                  onClick={() => console.log('hola')}
                  className={'bg-green-400 w-1/6 rounded-xl mt-5 h-[50px] font-bold'}>Enviar
                </button>
                <button
                  onClick={() => setPopUpAdd(false)}
                  className={'bg-red-400 w-1/6 rounded-xl mt-5 h-[50px] font-bold'}>Cancelar
                </button>
              </div>
          }
        </div>
      </div>
    </MobileLayout>
  )
}
