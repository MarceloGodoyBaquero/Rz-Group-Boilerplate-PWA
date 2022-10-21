/* eslint react/prop-types: 0 */
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { Modal, Select, Button } from 'flowbite-react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { QRCodeCanvas } from 'qrcode.react'

export default function ClientTravelsCard ({ estado, id, data }) {
  const router = useRouter()
  const { user } = useSelector(state => state)
  const [selectedTravel, setSelectedTravel] = useState('')
  const [selectedVehicle, setSelectedVehicle] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [qrCode, setQrCode] = useState('')
  // eslint-disable-next-line
  const [qrCodeDirection, setQrCodeDirection] = useState('')
  const [vehicles, setVehicles] = useState([])
  console.log('id card', id)

  useEffect(() => {
    setQrCode(window.location.origin)
  }, [])

  const downloadQRCode = () => {
    // Generate download with use canvas and stream
    const canvas = document.getElementById('QR-generado')
    // console.log('canvas', canvas)
    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
    // console.log('pngUrl', pngUrl)
    setQrCode(pngUrl)
    console.log('qrCode', qrCode)
    // const downloadLink = document.createElement('a')
    // downloadLink.href = pngUrl
    // downloadLink.download = `${qrValue}.png`
    // document.body.appendChild(downloadLink)
    // downloadLink.click()
    // document.body.removeChild(downloadLink)
  }

  const showPopup = (id) => {
    axios.get(`https://rz-group-backend.herokuapp.com/api/user/chooseVehicle/${user.id}`)
      .then(res => {
        console.log(res.data)
        setVehicles(res.data)
      }).catch(err => {
        console.log(err)
      })
    setSelectedTravel(id)
    setShowModal(true)
    return downloadQRCode()
  }

  const aceptarViaje = async (id, idvehiculo) => {
    if (!selectedVehicle) {
      return toast.error('Seleccione un vehiculo')
    }
    axios.post(`https://rz-group-backend.herokuapp.com/api/admin/service/confirm/${selectedTravel}`, {
      vehicleId: selectedVehicle,
      driverId: user.id,
      QR_code: qrCode
    }).then(res => {
      toast.success('Viaje aceptado')
      setTimeout(() => {
        router.reload()
      }, 2000)
    }).catch(err => {
      console.log(err)
      toast.error('Error al aceptar viaje')
    })
  }

  const RechazarViaje = async (id) => {
    axios.post(`https://rz-group-backend.herokuapp.com/api/services/cancel/${id}`)
      .then(res => {
        toast.success('Viaje rechazado')
        setTimeout(() => {
          router.reload()
        }, 2000)
      }).catch(err => {
        console.log(err)
        toast.error('Error al rechazar viaje')
      })
  }

  return (
    <div
      className={'bg-white m-2 flex-col flex h-[180px] items-center w-5/6 rounded justify-center  content-center'}>
      <div className={'flex flex-col justify-between w-full items-center'}>
        <ToastContainer/>
        <div className={'flex flex-row justify-evenly w-full '}>
          <div>
            <h1>Origen: {data?.from}</h1>
            <h1>Destino: {data?.to}</h1>
          </div>
          <div>
            <h1>Inicio: {data?.start_date?.slice(0, 10)}</h1>
            <h1>Final: {data?.end_date?.slice(0, 10)}</h1>
          </div>
        </div>
        <div className={'flex flex-row justify-evenly items-center w-full mt-5'}>
          {
            data.status === 'pending' && user?.roles?.includes('driver')
              ? <>
                <Button onClick={() => showPopup(data._id)} color='success'>Aceptar</Button>
                <Button onClick={() => RechazarViaje(id)} color='failure'>Rechazar</Button>
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
                {vehicles && vehicles?.filter(e => e?.isAproved === 'aproved')?.map((vehicle) => (
                  <option key={vehicle._id} value={vehicle._id}>
                    {vehicle.brand} {vehicle.model} ({vehicle.carPlate})
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
        <div className={'hidden'}>
          <QRCodeCanvas
            className={'mt-3'}
            id={'QR-generado'}
            includeMargin={true}
            fgColor={'#5b211f'}
            size={250}
            value={`${qrCodeDirection}/FuecComp/${id}`}/>
        </div>
      </div>
    </div>
  )
}
