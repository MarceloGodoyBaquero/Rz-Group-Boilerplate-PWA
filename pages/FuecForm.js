import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Nav from '../components/Nav'
import Image from 'next/image'
import SignUp from '../public/Images/OnBoarding-1.svg'
// import { useRouter } from 'next/router'
import MobileLayout from '../components/MobileLayout'
import { useDispatch, useSelector } from 'react-redux'
import { createService } from '../Redux/Actions/servicesActions'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Spinner } from 'flowbite-react'
import { InformationCircleIcon } from '@heroicons/react/24/solid'
import Select from 'react-select'
import { useRouter } from 'next/router'

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
  const [asociateDrivers, setAsociateDrivers] = useState([])
  const [allDrivers, setAllDrivers] = useState([])

  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [inputConductor, setInputConductor] = useState(0)

  const [alliedDriver, setAlliedDriver] = useState(true)
  // eslint-disable-next-line
  const [favoriteDriver, setFavoriteDriver] = useState(false)
  // eslint-disable-next-line
  const [addNewDriverInput, setAddNewDriverInput] = useState(false)
  const [addNewDriver, setAddNewDriver] = useState(false)

  const [selectedNewDriver, setSelectedNewDriver] = useState('')

  const [specificDriver, setSpecificDriver] = useState(false)
  const [driversMap, setDriversMap] = useState([])

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
      serviceType: '',
      start_time: '',
      category: '',
      driver: user.roles === 'driver' ? [user.id] : [],
      client: user.id,
      asociateDriver: ''
    })
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState({})

  useEffect(() => {
    setMounted(true)
  }, [])

  const findAllDrivers = () => {
    setLoading2(true)
    axios.get('https://rz-group-backend.herokuapp.com/api/user?skip=0&limit=100')
      .then(res => {
        console.log(res.data.data)
        setAllDrivers(res.data.data.filter(driver => driver.roles[0].name === 'driver' && driver.isAproved === 'aproved'))
        setLoading2(false)
      })
  }

  const handleSearchDrivers = () => {
    setLoading(true)
    axios.get(`https://rz-group-backend.herokuapp.com/api/company/drivers/${user.companyAllied._id}`)
      .then((res) => {
        console.log('datota', res)
        setDriversMap(res.data.driversAllied.map(e => {
          return {
            value: e._id,
            label: e.firstName + ' ' + e.lastName
          }
        }))
        setAsociateDrivers(res.data.driversAllied ? res.data.driversAllied : [])
        setLoading(false)
        if (res.data.driversAllied?.length === 0 || res.data.driversAllied === undefined) {
          toast.error('No hay conductores asociados a esta empresa, puedes agregar uno nuevo en este formulario')
          setAddNewDriverInput(true)
        }
      })
  }
  const handleAddNewDriver = () => {
    axios.post(`https://rz-group-backend.herokuapp.com/api/company/addDriver/${user.companyAllied._id}`, { userId: selectedNewDriver })
      .then((res) => {
        console.log(res.data)
        toast.success('Conductor agregado correctamente')
        setAddNewDriverInput(false)
        setAlliedDriver(true)
      })
  }

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
      for (let i = 0; i < Number(input.number_vehicles); i++) {
        dispatch(createService(input))
      }
      toast.success('Servicio creado correctamente')
      setTimeout(() => {
        router.push('/client/travels')
      }, 2000)
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
          <div className={'w-full m-2 flex flex-col justify-center items-center'}>
            {
              user.companyAllied
                ? (
                  <div className='mb-5 flex flex-row justify-center items-center'>
                    <InformationCircleIcon className=' text-gray-500 mr-2 h-16 w-16'/>
                    <p>
                      Si agregas mas de 1 vehiculo, no podras agregar un conductor especifico.
                    </p>
                  </div>
                  )
                : null
            }
            <input placeholder={'Cantidad de Vehículos'}
                   className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                   onChange={(e) => handleInputChange(e)}
                   name={'number_vehicles'}
                   type={'number'}
                   onKeyPress={(e) => {
                     if (!/[0-9]/.test(e.key)) {
                       e.preventDefault()
                     }
                   }}
                   value={input.number_vehicles.toString()}
            />
          </div>
          {
            Number(input.number_vehicles) === 1 && alliedDriver && user.companyAllied
              ? (
                <div className='flex flex-col justify-center items-center mt-5'>
                  <p>
                    ¿Tienes un conductor específico?
                  </p>
                  <div className='w-full flex flex-row justify-evenly items-center mt-5 mb-5'>
                    <div>
                      <label>Si</label>
                      <input type="checkbox" className='rounded-full' checked={specificDriver}
                             onChange={() => user.companyAllied ? setSpecificDriver(true) : setFavoriteDriver(true)}/>
                    </div>
                    <div>
                      <label>No</label>
                      <input type="checkbox" className='rounded-full' checked={!specificDriver}
                             onChange={() => user.companyAllied ? setSpecificDriver(false) : setFavoriteDriver(false)}/>
                    </div>
                  </div>
                  {
                    specificDriver
                      ? (
                        <div className='w-full flex flex-col justify-center items-center mb-5 '>
                          {asociateDrivers.length === 0
                            ? <button
                              className='bg-[#5b211f] rounded-lg w-[100px] h-[33px] text-white text-center text-sm font-bold border-[none]'
                              onClick={() => handleSearchDrivers()}>
                              {loading
                                ? (<Spinner color="warning" aria-label="Warning spinner example"/>)
                                : (<p>Buscar</p>)}
                            </button>
                            : (
                              <div className='flex flex-col justify-center items-center w-full'>
                                <label htmlFor="Drivers"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Elige una
                                  opción</label>
                                {/* <select id="Drivers" */}
                                {/*       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" */}
                                {/*       onChange={(e) => setInput({ ...input, asociateDriver: e.target.value })}> */}
                                {/* <option selected disabled={true}>Elige un conductor</option> */}
                                {/* { */}
                                {/*   asociateDrivers.map((driver, i) => ( */}
                                {/*     <option value={driver._id} key={i}> {driver.firstName} {driver.lastName} </option> */}
                                {/*   )) */}
                                {/* } */}
                                {/* </select> */}
                                <div className={'w-full'}>
                                  <Select options={driversMap}
                                          onChange={(e) => setInput({ ...input, asociateDriver: e.value })}/>
                                   {/* <ReactSearchAutocomplete onSelect={(item) => setInput({ ...input, asociateDriver: item.id })} onSearch={() => console.log(driversMap)} items={driversMap} autoFocus={true}/> */}
                                </div>
                              </div>
                              )
                          }
                        </div>
                        )
                      : null
                  }
                  <div className='flex flex-col justify-center items-center mt-5'>
                    <p>
                      ¿Quieres agregar un conductor a tu empresa?
                    </p>
                    <div className='w-full flex flex-row justify-evenly items-center mt-5 mb-5'>
                      <div>
                        <label>Si</label>
                        <input type="checkbox" className='rounded-full' checked={addNewDriver}
                               onChange={() => setAddNewDriver(true)}/>
                      </div>
                      <div>
                        <label>No</label>
                        <input type="checkbox" className='rounded-full' checked={!addNewDriver}
                               onChange={() => setAddNewDriver(false)}/>
                      </div>
                    </div>
                    {
                      addNewDriver && (
                        <div className='w-full flex flex-col justify-center items-center mb-5 '>
                          {
                            allDrivers.length === 0
                              ? (<button
                                className='bg-[#5b211f] rounded-lg w-[100px] h-[33px] text-white text-center text-sm font-bold border-[none]'
                                onClick={() => findAllDrivers()}>
                                {loading2
                                  ? (<Spinner color="warning" aria-label="Warning spinner example"/>)
                                  : (<p>Buscar</p>)}
                              </button>)
                              : (<div className='flex flex-col justify-center items-center w-full'>
                                <label htmlFor="Drivers"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                                  Elige una opción</label>
                                <select id="Drivers"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={(e) => setSelectedNewDriver(e.target.value)}>
                                  <option selected disabled={true}>Elige un conductor</option>
                                  {
                                    allDrivers.map((driver, i) => (
                                      <option value={driver._id} key={i}> {driver.firstName} {driver.lastName} </option>
                                    ))
                                  }
                                </select>
                                {selectedNewDriver && (
                                  <div className='flex justify-center items-center w-full mt-5'>
                                    <button
                                      className='bg-[#5b211f] rounded-lg w-[100px] h-[33px] text-white text-center text-sm font-bold border-[none]'
                                      onClick={() => handleAddNewDriver()}> Agregar
                                    </button>
                                  </div>
                                )}
                              </div>)
                          }
                        </div>
                      )
                    }
                  </div>
                </div>
                )
              : null
            // TODO: Hacer que se pueda seleccionar un conductor favorito si no tiene la propiedad user.alliedCompany
          }
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
              {/* {user && user?.roles?.includes('driver') ? null : <option value="conductor específico">Escoger conductor en específico</option>} */}
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
              <select onChange={(e) => setInput({ ...input, driver: [e.target.value] })}
                      name={'driver'}
                      className={'w-full indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}>
                {
                  // eslint-disable-next-line
                  datosFiltrados?.map((item, index) => {
                    return <option key={index} value={item._id}>{item.firstName} {item.lastName}</option>
                  })
                }
              </select>
            </div>
          )}
          <div className={'w-full m-2'}>
            <button className={'w-full rounded-[25px] h-[50px] text-white bg-[#5B211F]'}
                    onClick={(e) => handleSubmit(e)}>Crear Servicio
            </button>
          </div>
        </div>
      </div>}
    </MobileLayout>
  )
}

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
