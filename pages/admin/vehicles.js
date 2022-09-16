import React, { useEffect, useState } from 'react'
import Nav from '../../components/Nav'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import MobileLayout from '../../components/MobileLayout'
import axios from 'axios'

export default function users () {
  const { user } = useSelector(state => state)
  const [vehicles, setVehicles] = useState([])

  useEffect(() => {
    axios.get('https://rz-group-backend.herokuapp.com/api/vehicles/all')
      .then(res => {
        console.log(res.data)
        setVehicles(res.data)
      })
  }, [])

  return (
    <MobileLayout>
      <div className={'md:shadow-2xl bg-[#F7F8FA] h-fit flex items-center flex-col'}>
        <Nav location={'Usuarios'}/>
        <div className={'flex flex-col justify-center w-full'}>
          <div className={'flex justify-center w-full items-center'}>
            <input
              className={'m-5 text-center h-[70px] w-full rounded-full border-2 border-blue-500'}
              type={'search'}
              placeholder={'Buscar vehiculo por MATRICULA'}
            />
          </div>
          {
            vehicles.map((vehicle, index) => {
              return (
                <div key={index} className={'m-5 bg-white flex flex-col justify-center items-center'}>
                  <h1 className={''}>Marca: {vehicle.brand}</h1>
                  <h1 className={''}>Modelo: {vehicle.model}</h1>
                  <h1 className={''}>Matricula: {vehicle.carPlate}</h1>
                </div>
              )
            })
          }
        </div>
      </div>
    </MobileLayout>
  )
}
