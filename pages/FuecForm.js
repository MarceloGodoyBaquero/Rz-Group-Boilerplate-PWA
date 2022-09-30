import React, { useState } from 'react'
import Nav from '../components/Nav'
import Image from 'next/image'
import { useRouter } from 'next/router'
import SignUp from '../public/Images/OnBoarding-1.svg'
// import { useRouter } from 'next/router'
import MobileLayout from '../components/MobileLayout'
import { useDispatch, useSelector } from 'react-redux'
import { createService } from '../Redux/Actions/servicesActions'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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

export default function Fuec () {
  // const router = useRouter()
  const { user } = useSelector(state => state)
  const router = useRouter()
  const [inputConductor, setInputConductor] = useState(0)
  const dispatch = useDispatch()
  const [input, setInput] = useState(
    {
      description: '',
      from: '',
      to: '',
      start_date: '',
      end_date: '',
      number_vehicles: '',
      duration: '',
      serviceType: '',
      category: '',
      driver: user.roles === 'driver' ? [user.id] : [],
      client: user.id
    })
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState({})

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
      console.log(input)
      dispatch(createService(input, router))
    }
  }

  const handleServiceSelect = function (e) {
    e.preventDefault()
    // if (e.target.value === 'conductor específico') {
    //   return setInputConductor(1)
    // }
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
  return (
    <MobileLayout>
      <div className={'md:shadow-2xl bg-[#F7F8FA] h-fit flex items-center flex-col'}>
        <ToastContainer />
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
            <input placeholder={'Cantidad de Vehículos'}
                   className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                   onChange={(e) => handleInputChange(e)}
                   name={'number_vehicles'}
                   type={'number'}
                   value={input.number_vehicles.toString()}
            />
          </div>
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
              <option value="Reservation per Hour">Reservación por horas</option>
              <option value="tourist trip">Sitios turísticos a nivel Cundinamarca</option>
              {/* <option value="conductor específico">Escoger conductor en específico</option> */}
              {/* <option value="Conductor de planta">Conductor de planta</option> */}
            </select>
          </div>
          {inputConductor === 2 && (
            <div className={'w-full m-2'}>
              <input placeholder={'Cantidad de Horas'}
                     className={'indent-5 border-2 border-[#5B211F] outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                     onChange={(e) => handleInputChange(e)}
                     name={'duration'}
                     type={'number'}
                     value={input.duration.toString()}
              />
            </div>
          )}
          {inputConductor === 1 && (
            <div className={'w-full m-2'}>
              <input placeholder={'Nombre del conductor'}
                     className={'indent-5 border-2 border-[#5B211F] outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                     onChange={(e) => handleInputChange(e)}
                     name={'Conductor'}
                     value={input.Conductor}
              />
            </div>
          )}
          <div className={'w-full m-2'}>
            <button className={'w-full rounded-[25px] h-[50px] text-white bg-[#5B211F]'}
                    onClick={(e) => handleSubmit(e)}>Crear Servicio
            </button>
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}
