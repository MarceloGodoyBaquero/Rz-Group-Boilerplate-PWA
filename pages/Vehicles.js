import React, { useEffect } from 'react'
import Nav from '../components/Nav'
import { useRouter } from 'next/router'
import MobileLayout from '../components/MobileLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getVehiclesByUser } from '../Redux/Actions/vehiclesActions'
import CarCard from '../components/CarCard'

export default function AddVehicle () {
  const router = useRouter()
  const { user, vehicles } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(user.id)
    dispatch(getVehiclesByUser(user.id))
  }, [user])

  return (
    <MobileLayout>
      <div className={'md:shadow-2xl bg-[#F7F8FA] h-screen flex items-center flex-col'}>
        <Nav location={'Tus vehículos'}/>
        <div className={'flex w-full h-full items-center justify-center'}>
          {!vehicles?.length &&
            <div className={'w-full m-2 flex flex-col items-center'}>
              <h3 className={'text-2xl mb-5'}>¡Parece que aún no tienes vehículos!</h3>
              <button className={'w-5/6 rounded-[25px] h-[50px] text-white bg-[#5B211F]'}
                      onClick={() => router.push('/AddVehicle')}>Cargar vehículo
              </button>
            </div>
          }
          {vehicles?.length > 0 &&
            <div className={'w-full items-center flex justify-center'}>
              {vehicles?.map((vehicle, index) => {
                return <CarCard
                  key={index}
                  brand={vehicle.brand}
                  model={vehicle.model}
                  year={vehicle.year}
                  plate={vehicle.carPlate}
                  aprobado={vehicle.isApproved}
                />
              })}
            </div>
          }
        </div>
      </div>
    </MobileLayout>
  )
}
