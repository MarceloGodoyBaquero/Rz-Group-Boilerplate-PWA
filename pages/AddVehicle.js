import React, { useState } from 'react'
import Nav from '../components/Nav'
import Image from 'next/image'
import SignUp from '../public/Images/OnBoarding-1.svg'
// import { useRouter } from 'next/router'
import MobileLayout from '../components/MobileLayout'
import { useDispatch, useSelector } from 'react-redux'
import { createVehicle } from '../Redux/Actions/vehiclesActions'
import { useRouter } from 'next/router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function validate (input) {
  const errors = {}
  if (!input.carPlate) {
    errors.carPlate = 'Matricula es requerida'
  } else if (input.carPlate.trim() === '') {
    errors.carPlate = 'Matricula no puede quedar vacío'
  }
  if (!input.type) {
    errors.type = 'Tipo de vehiculo requerido'
  } else if (input.type.trim() === '') {
    errors.type = 'Tipo de vehiculo no puede quedar vacío'
  }
  if (!input.brand) {
    errors.brand = 'Marca requerida'
  } else if (input.brand.trim() === '') {
    errors.brand = 'Marca no puede quedar vacío'
  }
  if (!input.model) {
    errors.model = 'Modelo requerido'
  } else if (input.model.trim() === '') {
    errors.model = 'Modelo no puede quedar vacío'
  }
  if (!input.year) {
    errors.year = 'Año requerido'
  } else if (input.year.trim() === '') {
    errors.year = 'Año no puede quedar vacío'
  }
  if (!input.category) {
    errors.category = 'Categoría requerida'
  } else if (input.category.trim() === '') {
    errors.category = 'Categoría no puede quedar vacío'
  }
  if (!input.capacity) {
    errors.capacity = 'Capacidad requerida'
  } else if (input.capacity > 20) {
    errors.capacity = 'Capacidad no puede quedar vacío'
  }
  return errors
}

const years = ['2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010']
const carTypes = ['Camioneta', 'Minivan', 'Aerovan', 'Busetón', 'Bus']

export default function AddVehicle () {
  // const router = useRouter()
  const { user } = useSelector(state => state)
  const dispatch = useDispatch()
  const router = useRouter()
  const [input, setInput] = useState(
    {
      carPlate: '',
      type: '',
      brand: '',
      model: '',
      year: '',
      category: '',
      capacity: '',
      numero_interno: '',
      tarjeta_operacion: '',
      owner: user.id
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
      alert('Por favor, rellene todos los campos obligatorios')
    } else {
      dispatch(createVehicle(input, router))
    }
  }
  console.log(input)
  return (
    <MobileLayout>
      <div className={'md:shadow-2xl bg-[#F7F8FA] h-fit flex items-center flex-col'}>
        <Nav location={'Agregar vehiculo'}/>
        <ToastContainer/>
        <div className={'h-1/2 flex justify-center'}>
          <Image width={'274px'} height={'287px'} src={SignUp} alt="hero" className={'w-3/4'}/>
        </div>
        <div className={'bg-white rounded-xl p-5 m-5 w-5/6 h-fit flex flex-col items-center justify-center shadow-lg'}>
          <div className={'m-2 w-full h-fit flex flex-col items-center justify-center'}>
            <h2 className={'font-bold text-2xl'}>Agrega un vehiculo</h2>
            <h2>Por favor, rellene todos los campos</h2>
          </div>
          <div className={'w-full m-2'}>
            <input placeholder={'Matrícula'}
                   type={'text'}
                   className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                   onChange={(e) => handleInputChange(e)}
                   name={'carPlate'}
                   value={input.carPlate}
            />
          </div>
          <div className={'w-full m-2'}>
            <select className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                    onChange={(e) => handleInputChange(e)}
                    name={'type'}
                    value={input.type}
            >
              <option value={''}>Tipo de vehiculo</option>
              {carTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className={'w-full m-2'}>
            <input placeholder={'Marca'}
                   type={'text'}
                   className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                   onChange={(e) => handleInputChange(e)}
                   name={'brand'}
                   value={input.brand}
            />
          </div>
          <div className={'w-full m-2'}>
            <input placeholder={'Modelo'}
                   type={'text'}
                   className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                   onChange={(e) => handleInputChange(e)}
                   name={'model'}
                   value={input.model}
            />
          </div>
          <div className={'w-full m-2'}>
            <select className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                    onChange={(e) => handleInputChange(e)}
                    name={'year'}
                    value={input.year}
            >
              <option value={''}>Año</option>
              {years.map((año, index) => <option key={index} value={año}>{año}</option>)}
            </select>
          </div>
          <div className={'w-full m-2'}>
            <select className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                    onChange={(e) => handleInputChange(e)}
                    name={'category'}
                    value={input.category}
            >
              <option value={''}>Categoría</option>
              <option value={'confort'}>Confort</option>
              <option value={'luxury'}>Luxury</option>
            </select>
          </div>
          <div className={'w-full m-2'}>
            <input placeholder={'Capacidad'}
                   type={'text'}
                   className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                   onChange={(e) => handleInputChange(e)}
                   name={'capacity'}
                   value={input.capacity}
            />
          </div>
          <div className={'w-full m-2'}>
            <input placeholder={'Número interno'}
                   type={'text'}
                   className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                   onChange={(e) => handleInputChange(e)}
                   name={'numero_interno'}
                   value={input.numero_interno}
            />
          </div>
          <div className={'w-full m-2'}>
            <input placeholder={'Número de tarjeta de operación'}
                   type={'text'}
                   className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                   onChange={(e) => handleInputChange(e)}
                   name={'tarjeta_operacion'}
                   value={input.tarjeta_operacion}
            />
          </div>
          <div className={'w-full m-2'}>
            <button className={'w-full rounded-[25px] h-[50px] text-white bg-[#5B211F]'}
                    onClick={(e) => handleSubmit(e)}>Crear vehiculo
            </button>
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}
