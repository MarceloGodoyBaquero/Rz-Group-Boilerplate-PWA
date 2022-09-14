import React, { useState } from 'react'
import Nav from '../components/Nav'
import Image from 'next/image'
import SignUp from '../public/Images/OnBoarding-1.svg'
// import { useRouter } from 'next/router'
import MobileLayout from '../components/MobileLayout'
import { useDispatch, useSelector } from 'react-redux'
import { createVehicle } from '../Redux/Actions/vehiclesActions'
import { UserIcon } from '@heroicons/react/24/solid'

function validate (input) {
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

const years = [2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010]

export default function AddVehicle () {
  // const router = useRouter()
  const { user } = useSelector(state => state)
  const dispatch = useDispatch()
  const [input, setInput] = useState(
    {
      carPlate: '',
      type: '',
      brand: '',
      model: '',
      year: '',
      category: '',
      capacity: '',
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
      alert('Please fill in all the required fields')
    } else {
      dispatch(createVehicle(input))
    }
  }
  console.log(input)
  return (
    <MobileLayout>
      <div className={'md:shadow-2xl bg-[#F7F8FA] h-fit flex items-center flex-col'}>
        <Nav location={'Agregar vehiculo'}/>
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
              <option value={'Car'}>Carro</option>
              <option value={'Motorcycle'}>Moto</option>
              <option value={'Truck'}>Camión</option>
            </select>
          </div>

          <div className={'w-full m-2'}>
            <input placeholder={'Marca'}
                   className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                   onChange={(e) => handleInputChange(e)}
                   name={'brand'}
                   value={input.brand}
            />
          </div>
          <div className={'w-full m-2'}>
            <input placeholder={'Modelo'}
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
            <input placeholder={'Capacidad'}
                   type={'number'}
                   className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                   onChange={(e) => handleInputChange(e)}
                   name={'capacity'}
                   value={input.capacity}
            />
          </div>
          <div className={'w-full m-2'}>
            <button className={'w-full rounded-[25px] h-[50px] text-white bg-[#5B211F]'}
                    onClick={(e) => handleSubmit(e)}>Create Ride
            </button>
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}
