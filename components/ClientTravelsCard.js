/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import {Modal, Select, Button} from 'flowbite-react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

export default function ClientTravelsCard ({ estado, id, data }) {
  const router = useRouter()
  const {vehicles, user} = useSelector(state => state)
  const [selectedTravel, setSelectedTravel] = useState('')
  const [selectedVehicle, setSelectedVehicle] = useState('')
  const [showModal, setShowModal] = useState(false)
  console.log(data)

  const showPopup = (id) => {
    setSelectedTravel(id)
    setShowModal(true)
  }

  const aceptarViaje = async (id, idvehiculo) => {
    if(!selectedVehicle){
      return toast.error('Seleccione un vehiculo')
    }
    axios.post(`https://rz-group-backend.herokuapp.com/api/admin/service/confirm/${selectedTravel}`,{
      vehicleId: selectedVehicle,
      driverId: user.id
    }).then(res => {
      console.log(res)
      toast.success('Viaje aceptado')
      setTimeout(() => {
        router.reload()
      }, 2000)
    }).catch(err => {
      console.log(err)
      toast.error('Error al aceptar viaje')
    })
  }
  return (
    <div
         className={'bg-white m-2 flex-col flex h-[180px] items-center w-full rounded justify-center  content-center'}>
      <div className={'indent-3 flex flex-col justify-between w-full items-center'}>
        <ToastContainer/>
        <div className={'indent-3 flex flex-row justify-between w-[50%] '}>
          <div>
        <h1>Origen: {data?.from}</h1>
        <h1>Destino: {data?.to}</h1>
        </div>
        <div>
        <h1>Inicio: {data?.start_date?.slice(0, 10)}</h1>
        <h1>Final: {data?.end_date?.slice(0, 10)}</h1>
        </div>
        </div>
        <div className={'indent-3 flex flex-row justify-between items-center w-[50%] mt-5'}>
          {
            data.status === 'pending' ? 
            <>
          <Button onClick={()=>showPopup(data._id)} color='success'>Aceptar</Button>
          <Button onClick={()=>{}} color='failure'>Rechazar</Button>
          </>
          : null
          }
          
          <Button onClick={() => router.push(`/client/travels/${id}`)} color='info'>Ver mas</Button>
        </div>
          <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
          >
            <Modal.Header className={'text-2xl font-bold text-center text-gray-800'}>
              Selecciona un vehiculo para aceptar el viaje.
            </Modal.Header>
            <Modal.Body className={'text-center text-gray-800'}>
              <div className="space-y-6">
                <Select
                  id="vehiculo"
                  required={true}
                  value={selectedVehicle}
                  onChange={(e) => setSelectedVehicle(e.target.value)}
                  >
                  <option value="">Selecciona un vehiculo</option>
                  {vehicles && vehicles?.map((vehicle) => (
                    <option key={vehicle._id} value={vehicle._id}>
                      {vehicle.brand} {vehicle.model}
                    </option>
                  ))}
                  </Select>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => aceptarViaje(selectedTravel)} color='success'>Aceptar</Button>
              <Button onClick={() => setShowModal(false)} color='failure'>Cancelar</Button>
            </Modal.Footer>
          </Modal>
      </div>
    </div>
  )
}