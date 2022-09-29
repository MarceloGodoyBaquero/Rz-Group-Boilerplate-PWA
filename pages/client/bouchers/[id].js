import React, {useState} from 'react'
import MobileLayout from '../../../components/MobileLayout'
import Nav from '../../../components/Nav'
import {useRouter} from 'next/router'
import {useDispatch} from "react-redux";
import {deleteService} from "../../../Redux/Actions/servicesActions";

export default function users(props) {
  const router = useRouter()
  const dispatch = useDispatch()
  const {id} = router.query
  const [popUpAdd, setPopUpAdd] = useState(false)
  const [popUpMOD, setPopUpMOD] = useState(false)
  return (
    <MobileLayout>
      <div className={'md:shadow-2xl bg-[#F7F8FA] h-screen flex items-center flex-col'}>
        <Nav location={'Detalles del Voucher'}/>
        <div className={'p-5 bg-white w-5/6 drop-shadow-2xl rounded-xl flex flex-col justify-evenly'}>
          <h1>Numero de servicio: {id}</h1>
          <h1>Precio: $50.000</h1>
          <h1>Inicio: 12/12/2022</h1>
          <h1>Final: 14/12/2022</h1>
          <h1>Origen: Medellin</h1>
          <h1>Destino: Cali</h1>
          <h1>Estado: Pendiente de pago</h1>
        </div>
        <div className={'flex flex-col w-full items-center'}>
          {
            !popUpAdd
              ? <button onClick={() => setPopUpAdd(true)}
                        className={'bg-blue-400 w-5/6 rounded-xl mt-5 h-[50px] font-bold'}>AGREGAR COMPROBANTE DE PAGO</button>
              :
              <div className={'w-5/6 flex flex-col'}>
                <span className={'bg-gray-300 w-full h-0.5 mt-5'}></span>
                <input
                  className={'indent-5 mt-5 border-2 border-[#5B211F] outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                  placeholder={'Empresa aliada'}
                />
                <label className={'flex items-center border-2 border-[#5B211F] justify-center w-full rounded-xl mt-5 h-[50px] font-bold'}>
                  Comprobante
                <input
                  onChange={(e) => console.log(e.target.value)}
                  placeholder={'Cantidad de vehículos extra'}
                  type={'file'}
                  style={{display: 'none'}}/>
                </label>
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