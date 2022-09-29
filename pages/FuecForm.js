import React, {useState} from 'react'
import Nav from '../components/Nav'
import Image from 'next/image'
import SignUp from '../public/Images/OnBoarding-1.svg'
// import { useRouter } from 'next/router'
import MobileLayout from '../components/MobileLayout'
import {useDispatch} from 'react-redux'
import {fuec} from '../Redux/Actions/fuecActions'

function validate(input) {
  const errors = {}
  if (!input.Name1) {
    errors.Name1 = 'Name is required'
  } else if (input.Name1.trim() === '') {
    errors.Name1 = 'Name may not be empty'
  }
  if (!input.Origin) {
    errors.Origin = 'Origin is required'
  } else if (input.Origin.trim() === '') {
    errors.Origin = 'Origin may not be empty'
  }
  if (!input.Destination) {
    errors.Destination = 'Destination is required'
  } else if (input.Destination.trim() === '') {
    errors.Destination = 'Destination is invalid'
  }
  if (!input.idNumber) {
    errors.idNumber = 'ID Number is required'
  } else if (input.idNumber.length < 3) {
    errors.idNumber = 'ID Number is invalid'
  }
  return errors
}

export default function Fuec() {
  // const router = useRouter()
  const [inputConductor, setInputConductor] = useState(0)
  const dispatch = useDispatch()
  const [input, setInput] = useState(
    {
      Name1: '',
      Origin: '',
      Destination: '',
      Passengers: '',
      idNumber: '',
      Horas: null,
      Conductor: null,
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
  }
  const handleSubmit = function (e) {
    e.preventDefault()
    const errors = validate(input)
    console.log(errors)
    if (Object.keys(errors).length > 0) {
      alert('Please fill in all the required fields')
    } else {
      dispatch(fuec(input))
    }
  }

  const handleServiceSelect = function (e) {
    e.preventDefault()
    if (e.target.value === 'conductor específico') {
      return setInputConductor(1)
    }
    if (e.target.value === 'Reservación por horas') {
      return setInputConductor(2)
    } else {
      return setInputConductor(0)
    }
  }
  return (
    <MobileLayout>
      <div className={'md:shadow-2xl bg-[#F7F8FA] h-fit flex items-center flex-col'}>
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
            <input placeholder={'Nombre'}
                   className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                   onChange={(e) => handleInputChange(e)}
                   name={'Name1'}
                   value={input.Name1}
            />
          </div>
          <div className={'w-full m-2'}>
            <input placeholder={'Origen'}
                   className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                   onChange={(e) => handleInputChange(e)}
                   name={'Origin'}
                   value={input.Origin}
            />
          </div>
          <div className={'w-full m-2'}>
            <input placeholder={'Destino'}
                   className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                   onChange={(e) => handleInputChange(e)}
                   name={'Destination'}
                   value={input.Destination}
            />
          </div>
          <div className={'w-full m-2'}>
            <input type={'date'}
                   placeholder={'Fecha Inicio'}
                   className={'pl-5 pr-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                   onChange={(e) => handleInputChange(e)}
                   name={'initialDate'}
                   value={input.initialDate}
            />
          </div>
          <div className={'w-full m-2'}>
            <input type={'date'}
                   className={'pl-5 pr-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                   onChange={(e) => handleInputChange(e)}
                   name={'finalDate'}
                   value={input.finalDate}
            />
          </div>
          <div className={'w-full m-2'}>
            <input placeholder={'Cantidad de Vehículos'}
                   className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                   onChange={(e) => handleInputChange(e)}
                   name={'Passengers'}
                   type={'number'}
                   value={input.Passengers}
            />
          </div>
          <div className={'w-full m-2'}>
            <textarea placeholder={'Descripción del servicio (max 150 caracteres)'}
                      style={{resize: 'none'}}
                      className={'p-5 outline-0 w-full h-[210px] rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                      onChange={(e) => handleInputChange(e)}
                      name={'idNumber'}
                      type={'text'}
                      value={input.idNumber}
                      maxLength={150}
            />
          </div>
          <div className={'w-full m-2'}>
            <select
              className={'w-full indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}>
              <option value="default">Clase</option>
              <option value="Premium">Premium</option>
              <option value="Confort">Confort</option>
            </select>
          </div>
          <div className={'w-full m-2'}>
            <select onChange={(e) => handleServiceSelect(e)}
                    className={'w-full indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}>
              <option value="default">Tipo de servicio</option>
              <option value="Transfer IN">Transfer IN</option>
              <option value="Transfer OUT">Transfer OUT</option>
              <option value="Reservación por horas">Reservación por horas</option>
              <option value="Sitio turísticos a Nivel Cundinamarca">Sitios turísticos a nivel Cundinamarca</option>
              <option value="conductor específico">Escoger conductor en específico</option>
              <option value="Conductor de planta">Conductor de planta</option>
            </select>
          </div>
          {inputConductor === 2 && (
            <div className={'w-full m-2'}>
              <input placeholder={'Cantidad de Horas'}
                     className={'indent-5 border-2 border-[#5B211F] outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                     onChange={(e) => handleInputChange(e)}
                     name={'Horas'}
                     type={'number'}
                     value={input.Horas}
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
