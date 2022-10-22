import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Nav from '../components/Nav'
import Image from 'next/image'
import SignUp from '../public/Images/OnBoarding-1.svg'
import { useRouter } from 'next/router'
import MobileLayout from '../components/MobileLayout'
import { useDispatch, useSelector } from 'react-redux'
// import { createService } from '../Redux/Actions/servicesActions'
// eslint-disable-next-line
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// eslint-disable-next-line
import {Button, Modal, Spinner} from 'flowbite-react'
// import { InformationCircleIcon } from '@heroicons/react/24/solid'
// import Select from 'react-select'

function validate (input) {
  const errors = {}
  if (!input.description) {
    errors.description = 'Name is required'
  } else if (input.description.trim() === '') {
    errors.description = 'Name may not be empty'
  }
  if (!input.from) {
    errors.from = 'Origin is required'
  } else if (input.from.trim() === '') {
    errors.from = 'Origin may not be empty'
  }
  if (!input.to) {
    errors.to = 'Destination is required'
  } else if (input.to.trim() === '') {
    errors.to = 'Destination is invalid'
  }
  return errors
}

// eslint-disable-next-line
export default function Fuec({datosFiltrados}) {
  const router = useRouter()
  const { user } = useSelector(state => state)
  // eslint-disable-next-line
  const [inputConductor, setInputConductor] = useState(0)
  // eslint-disable-next-line
  const dispatch = useDispatch()
  const [mounted, setMounted] = useState(false)
  const [input, setInput] = useState(
    {
      description: '',
      from: '',
      to: '',
      start_date: '',
      end_date: '',
      number_vehicles: '',
      duration: '',
      name: '',
      id_type: '',
      serviceType: '',
      id_number: '',
      address: '',
      phone: '',
      email: '',
      start_time: '',
      category: '',
      responsible_id: '',
      responsible_name: '',
      responsible_phone: ''
    })
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [tab, setTab] = useState(1)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleInputChange = function (e) {
    setError(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    console.log(input)
  }
  const handleSubmit = function (e) {
    e.preventDefault()
    const errors = validate(input)
    console.log(errors)
    if (Object.keys(errors).length > 0) {
      alert('Please fill in all the required fields')
    } else {
      // for (let i = 0; i < Number(input.number_vehicles); i++) {
      axios.post(`https://rz-group-backend.herokuapp.com/api/services/createExt/${user.id}`, input)
        .then(res => {
          console.log(res)
          toast.success('Viaje creado')
          setTimeout(() => {
            // eslint-disable-next-line
            router.push('/client/travels/')
          }, 2000)
        })
        .catch(err => {
          console.log(err)
          toast.error('Viaje rechazado')
        })
      // }
    }
  }

  const handleServiceSelect = function (e) {
    e.preventDefault()
    if (e.target.value === 'conductor específico') {
      return setInputConductor(1)
    }
    if (e.target.value === 'Reservation per Hour') {
      setInputConductor(2)
      return setInput({
        ...input,
        [e.target.name]: e.target.value
      })
    } else {
      setInputConductor(0)
      return setInput({
        ...input,
        [e.target.name]: e.target.value
      })
    }
  }

  const handleCancel = function (e) {
    e.preventDefault()
    setInput({
      ...input,
      name: '',
      id_type: '',
      id_number: '',
      address: '',
      phone: '',
      email: '',
      responsible_id: '',
      responsible_name: '',
      responsible_phone: ''
    })
    console.log(input)
    setShowModal(false)
  }

  const handleChangeTab = (num) => {
    setTab(num)
    setInput({
      ...input,
      name: '',
      id_type: '',
      id_number: '',
      address: '',
      phone: '',
      email: '',
      responsible_id: '',
      responsible_name: '',
      responsible_phone: ''
    })
  }

  return (
    <MobileLayout>
      {mounted && <div className={'md:shadow-2xl bg-[#F7F8FA] h-fit flex items-center flex-col'}>
        <ToastContainer/>
        <Nav location={'Nuevo servicio'}/>
        <div className={'h-1/2 flex justify-center'}>
          <Image width={'274px'} height={'287px'} src={SignUp} alt="hero" className={'w-3/4'}/>
        </div>
        <div className={'bg-white rounded-xl p-5 m-5 w-5/6 h-fit flex flex-col items-center justify-center shadow-lg'}>
          <div className={'m-2 w-full h-fit flex flex-col items-center justify-center'}>
            <h2 className={'font-bold text-2xl'}>Crear nuevo servicio</h2>
            <h2 className={'text-center'}>Por favor completar todos los campos</h2>
          </div>
          <div className={'w-full m-2'}>
            <button className={'w-full rounded-[25px] h-[50px] text-white bg-[#5B211F]'}
                    onClick={() => setShowModal(true)}>CARGAR CLIENTE EXTERNO
            </button>
          </div>
          <div className={'w-full m-2'}>
            <input placeholder={'Origen'}
                   className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                   onChange={(e) => handleInputChange(e)}
                   name={'from'}
                   value={input.from}
            />
          </div>
          <div className={'w-full m-2'}>
            <input placeholder={'Destino'}
                   className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                   onChange={(e) => handleInputChange(e)}
                   name={'to'}
                   value={input.to}
            />
          </div>
          <div className={'w-full m-2'}>
            <input type={'date'}
                   placeholder={'Fecha Inicio'}
                   className={'pl-5 pr-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                   onChange={(e) => handleInputChange(e)}
                   name={'start_date'}
                   value={input.start_date}
            />
          </div>
          <div className={'w-full m-2'}>
            <input type={'date'}
                   className={'pl-5 pr-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                   onChange={(e) => handleInputChange(e)}
                   name={'end_date'}
                   value={input.end_date}
            />
          </div>
          <div className={'w-full m-2'}>
            <label>
              <p className={'indent-3 font-bold text-black'}>Hora de llegada</p>
              <input placeholder={'Hora de llegada'}
                     className={'indent-1 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                     onChange={(e) => handleInputChange(e)}
                     name={'start_time'}
                     type={'time'}
                     value={input.start_time.toString()}
              />
            </label>
          </div>
          {/* <div className={'w-full m-2 flex flex-col justify-center items-center'}> */}
          {/*  <input placeholder={'Cantidad de Vehículos'} */}
          {/*         className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'} */}
          {/*         onChange={(e) => handleInputChange(e)} */}
          {/*         name={'number_vehicles'} */}
          {/*         type={'number'} */}
          {/*         onKeyPress={(e) => { */}
          {/*           if (!/[0-9]/.test(e.key)) { */}
          {/*             e.preventDefault() */}
          {/*           } */}
          {/*         }} */}
          {/*         value={input.number_vehicles.toString()} */}
          {/*  /> */}
          {/* </div> */}
          <div className={'w-full m-2'}>
            <textarea placeholder={'Descripción del servicio (max 150 caracteres)'}
                      style={{ resize: 'none' }}
                      className={'p-5 outline-0 w-full h-[210px] rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                      onChange={(e) => handleInputChange(e)}
                      name={'description'}
                      type={'text'}
                      value={input.description}
                      maxLength={150}
            />
          </div>
          <div className={'w-full m-2'}>
            <select
              onChange={(e) => handleInputChange(e)}
              name={'category'}
              className={'w-full indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}>
              <option value="default">Categoría</option>
              <option value="confort">Confort</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>
          <div className={'w-full m-2'}>
            <select onChange={(e) => handleServiceSelect(e)}
                    name={'serviceType'}
                    className={'w-full indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}>
              <option value="default">Tipo de servicio</option>
              <option value="Transfer IN">Transfer IN</option>
              <option value="Transfer OUT">Transfer OUT</option>
              <option value="Transfer IN & OUT">Transfer IN y OUT</option>
              {/* <option value="Reservation per Hour">Reservación por horas</option> */}
              <option value="tourist trip">Sitios turísticos a nivel Cundinamarca</option>
            </select>
          </div>
          <div className={'w-full m-2'}>
            <button className={'w-full rounded-[25px] h-[50px] text-white bg-[#5B211F]'}
                    onClick={(e) => handleSubmit(e)}>Crear Servicio
            </button>
          </div>
        </div>

        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <Modal.Header className={'text-2xl font-bold text-center text-gray-800'}>
            Carga los datos del cliente externo.
          </Modal.Header>
          <Modal.Body className={'text-center text-gray-800'}>
            <div className={'space-y-6 w-full'}>
              <div className={'flex items-center justify-between ml-1 mr-1 '}>
                <button onClick={() => handleChangeTab(1)}
                        className={tab === 1 ? 'text-white font-bold w-2/3 bg-[#5b211f] h-[50px] rounded-[25px]' : 'w-2/3 border-2 h-[50px] rounded-[25px]'}>
                  Persona Natural
                </button>
                <button onClick={() => handleChangeTab(2)}
                        className={tab === 2 ? 'text-white font-bold w-2/3 bg-[#5b211f] h-[50px] rounded-[25px]' : 'w-2/3 border-2 h-[50px] rounded-[25px]'}>
                  Persona Jurídica
                </button>
              </div>
              {
                tab === 2
                  ? (<div className={'space-y-6 w-full'}>
                    <input name={'responsible_name'} onChange={(e) => handleInputChange(e)} type={'text'}
                           placeholder={'Nombre Responsable'}
                           className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}/>
                    <input name={'responsible_phone'} onChange={(e) => handleInputChange(e)} type={'number'}
                           placeholder={'Teléfono Responsable'}
                           className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}/>
                    <input name={'responsible_id'} onChange={(e) => handleInputChange(e)} type={'number'}
                           placeholder={'CC/ NIT Responsable'}
                           className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}/>
                  </div>)
                  : null
              }
              <input name={'name'} onChange={(e) => handleInputChange(e)} type={'text'}
                     placeholder={tab === 2 ? 'Nombre Empresa' : 'Nombre'}
                     className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}/>
              <input name={'phone'} onChange={(e) => handleInputChange(e)} type={'tel'}
                     placeholder={tab === 2 ? 'Teléfono Empresa' : 'Teléfono'}
                     className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}/>
              <select name={'id_type'} onChange={(e) => handleInputChange(e)} placeholder={'Teléfono'}
                      className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}>
                <option value="default">Tipo de documento</option>
                <option value="NIT">NIT</option>
                <option value="CC/CE">CC/CE</option>
              </select>
              <input name={'id_number'} onChange={(e) => handleInputChange(e)} type={'number'}
                     placeholder={tab === 2 ? 'CC / NIT Empresa' : 'CC / NIT'}
                     className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}/>
              <input name={'address'} onChange={(e) => handleInputChange(e)} type={'text'}
                     placeholder={tab === 2 ? 'Dirección Empresa' : 'Dirección'}
                     className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}/>
              <input name={'email'} onChange={(e) => handleInputChange(e)} type={'email'}
                     placeholder={tab === 2 ? 'Email Empresa' : 'Email'}
                     className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}/>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setShowModal(false)} color='success'>Aceptar</Button>
            <Button onClick={(e) => handleCancel(e)} color='failure'>Cancelar</Button>
          </Modal.Footer>
        </Modal>

      </div>}
    </MobileLayout>
  )
}

//   {
//     "name": "Alberto Moreno",/
//     "id_type": "NIT",/
//     "id_number": "4345435",/
//     "address": "pueblo paleta",/
//     "phone": "023032032",/
//     "email": "holis@gmail.com"/
// }

export async function getServerSideProps () {
  const res = await fetch('https://rz-group-backend.herokuapp.com/api/user?skip=0&limit=50')
  const datos = await res.json()
  const datosFiltrados = await datos.data.filter((item) => item.isAproved === 'aproved')
  console.log(datosFiltrados)
  return {
    props: {
      datosFiltrados
    }
  }
}
