import React, { useEffect } from 'react'
import Nav from '../components/Nav'
import { useRouter } from 'next/router'
import MobileLayout from '../components/MobileLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getVehiclesByUser } from '../Redux/Actions/vehiclesActions'
// import CarCard from '../components/CarCard'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { IoCarSportSharp } from 'react-icons/io5'

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
        <ToastContainer/>
        <div className={'flex w-full h-fit items-center justify-center'}>
          {!vehicles?.length &&
            <div className={'w-full m-2 flex flex-col items-center'}>
              <h3 className={'text-2xl mb-5'}>¡Parece que aún no tienes vehículos!</h3>
              <button className={'w-5/6 rounded-[25px] h-[50px] text-white bg-[#5B211F]'}
                      onClick={() => router.push('/AddVehicle')}>Cargar vehículo
              </button>
            </div>
          }
          {/* {vehicles?.length > 0 && */}
          {/*  <div className={'mt-5 w-full items-center flex flex-col'}> */}
          {/*    {vehicles?.filter(e => e.isActive === true)?.map((vehicle, index) => { */}
          {/*      return <CarCard */}
          {/*        id={vehicle._id} */}
          {/*        key={index} */}
          {/*        brand={vehicle.brand} */}
          {/*        model={vehicle.model} */}
          {/*        year={vehicle.year} */}
          {/*        plate={vehicle.carPlate} */}
          {/*        aprobado={vehicle.isAproved} */}
          {/*      /> */}
          {/*    })} */}
          {/*  </div> */}
          {/* } */}
          {vehicles?.length > 0 &&
            <div className={'mt-5 w-full items-center flex flex-col'}>
              {
                vehicles?.filter(e => e.isActive === true)?.map((vehicle, index) => {
                  return <div
                    key={index}
                    onClick={() => router.push(`/driver/vehicles/${vehicle._id}`)}
                    className={index % 2 === 0 ? 'rounded-2xl w-full ml-5 mr-5 mt-5 mb-2 pl-0 bg-white flex flex-row justify-center items-center drop-shadow-2xl' : 'w-full rounded-2xl ml-5 mr-5 mt-5 mb-2 bg-gray-100 flex flex-row justify-center items-center drop-shadow-2xl'}>
                    <div className={vehicle.isAproved === 'aproved'
                      ? 'bg-green-300 border-4 border-green-500 w-[100px] h-[100px] m-0 h-full rounded-full p-0 flex flex-col items-center justify-center'
                      : vehicle.isAproved === 'inReview'
                        ? 'bg-orange-300 border-4 border-orange-500 w-[100px] h-[100px] rounded-xl m-0 p-0 flex flex-col items-center justify-center'
                        : 'text-center bg-red-300 border-4 border-red-500 w-[100px] h-[100px] rounded-xl m-0 p-0 flex flex-col items-center justify-center'}>
                      <IoCarSportSharp className={'h-10 w-10 text-white'}/>
                      {vehicle.isAproved === 'aproved'
                        ? <h3>Aprobado</h3>
                        : vehicle.isAproved === 'inReview'
                          ? <h3>Pendiente</h3>
                          : <h3>No aprobado</h3>}
                    </div>
                    <div className={'w-3/4 flex flex-col items-center justify-center'}>
                      <h1 className={'mt-2 cursor-pointer bg-gradient-to-l from-gray-300 font-bold text-center w-full bg- h-[30px] rounded-r-xl'}>
                         Dueño: {user.name}
                      </h1>
                      <ul>
                        <li className={''}>Marca: {vehicle.brand}</li>
                        <li className={''}>Modelo: {vehicle.model}</li>
                        <li className={''}>Matricula: {vehicle.carPlate}</li>
                        <li className={''}>Categoría: {vehicle.category}</li>
                        <li className={''}>Fecha de subida: {vehicle?.createdAt?.slice(0, 10)}</li>
                      </ul>
                    </div>
                  </div>
                })
              }
            </div>
          }
        </div>
      </div>
    </MobileLayout>
  )
}

// <div
//   onClick={() => router.push(`/admin/vehicles/${vehicle._id}`)}
//   key={index}
//   className={index % 2 === 0 ? 'rounded-2xl ml-5 mr-5 mt-5 mb-2 pl-0 bg-white flex flex-row justify-center items-center drop-shadow-2xl' : 'rounded-2xl ml-5 mr-5 mt-5 mb-2 bg-gray-100 flex flex-row justify-center items-center drop-shadow-2xl'}>
//   <div className={vehicle.isAproved === 'aproved'
//     ? 'bg-green-300 border-4 border-green-500 w-[100px] h-[100px] m-0 h-full rounded-full p-0 flex flex-col items-center justify-center'
//     : vehicle.isAproved === 'inReview'
//       ? 'bg-orange-300 border-4 border-orange-500 w-[100px] h-[100px] rounded-xl m-0 p-0 flex flex-col items-center justify-center'
//       : 'text-center bg-red-300 border-4 border-red-500 w-[100px] h-[100px] rounded-xl m-0 p-0 flex flex-col items-center justify-center'}>
//     <IoCarSportSharp className={'h-10 w-10 text-white'}/>
//     {vehicle.isAproved === 'aproved'
//       ? <h3>Aprobado</h3>
//       : vehicle.isAproved === 'inReview'
//         ? <h3>Pendiente</h3>
//         : <h3>No aprobado</h3>}
//   </div>
//   <div className={'w-3/4 flex flex-col items-center justify-center'}>
//     <h1
//       className={'mt-2 cursor-pointer bg-gradient-to-l from-gray-300 font-bold text-center w-full bg- h-[30px] rounded-r-xl'}>Dueño: {`${owner?.firstName} ${owner?.lastName}`}</h1>
//     <ul>
//       <li className={''}>Marca: {vehicle.brand}</li>
//       <li className={''}>Modelo: {vehicle.model}</li>
//       <li className={''}>Matricula: {vehicle.carPlate}</li>
//       <li className={''}>Categoría: {vehicle.category}</li>
//       <li className={''}>Fecha de subida: {vehicle?.createdAt?.slice(0, 10)}</li>
//     </ul>
//   </div>
// </div>
