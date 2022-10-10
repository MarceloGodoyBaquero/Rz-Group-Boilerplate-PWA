import dynamic from 'next/dynamic'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import validationHero from '../../public/Images/OnBoarding-3.svg'
import Image from 'next/image'/*  */
import { /* IdentificationIcon */ CreditCardIcon, DocumentTextIcon, /*  CloudArrowUpIcon, */ CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Player, Controls } from '@lottiefiles/react-lottie-player'
import MobileLayout from '../../components/MobileLayout'
import { useRouter } from 'next/router'
const Nav = dynamic(() => import('../../components/Nav'), { ssr: false })

export default function Validation () {
  const [mounted, setMounted] = useState(false)
  const [status, setStatus] = useState('')
  const [file, setFile] = useState(null)
  const [file2, setFile2] = useState(null)
  const [file3, setFile3] = useState(null)
  const [file4, setFile4] = useState(null)
  const [file5, setFile5] = useState(null)
  const [input, setInput] = useState({
    poliza_exp: '',
    poliza_ven: '',
    soat_exp: '',
    soat_ven: ''
  })
  const router = useRouter()
  const { id } = router.query
  console.log(router.query)
  const [next, setNext] = useState(1)
  const reviewVehicle = () => {
    setNext(3)
    setTimeout(() => {
      router.push('/Main')
    }, 3000)
  }
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    axios.get(`https://rz-group-backend.herokuapp.com/api/vehicles/${id}`)
      .then(res => {
        setStatus(res.data.isAproved)
        status === 'aproved' && router.push('/Main')
        status === 'inReview' && reviewVehicle()
      })
  }, [status])

  const nextStep = () => {
    setNext(next + 1)
  }

  const successToast = () => toast.success('¡Tu solicitud ha sido enviada con éxito!', {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  })

  const errorToast = (message) => toast.error(message, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  })

  const submit = (e) => {
    if (!file || !file2 || !file3 || !file4 || !file5) {
      e.preventDefault()
      return errorToast('Por favor suba todos los archivos')
    }
    e.preventDefault()
    const formData = new FormData()
    formData.append('fecha_exp_poliza', input.poliza_exp)
    formData.append('fecha_ven_poliza', input.poliza_ven)
    formData.append('fecha_exp_soat', input.soat_exp)
    formData.append('fecha_ven_soat', input.soat_ven)
    formData.append('revision_tecnomecanica', file)
    formData.append('poliza_contraactual', file2)
    formData.append('soat', file3)
    formData.append('propertyCardFront', file4)
    formData.append('propertyCardBack', file5)
    axios.post(`https://rz-group-backend.herokuapp.com/api/vehicles/upload/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      setNext(3)
      setTimeout(() => {
        router.push('/Vehicles')
        successToast()
      }, 5000)
    }).catch(err => {
      errorToast(err.response.data.message)
    })
  }
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }
  console.log(input)
  const selectedFile = (e) => {
    console.log(e.target.files)
    setFile(e.target.files[0])
  }
  const selectedFile2 = (e) => {
    console.log(e.target.files)
    setFile2(e.target.files[0])
  }
  const selectedFile3 = (e) => {
    console.log(e.target.files)
    setFile3(e.target.files[0])
  }
  const selectedFile4 = (e) => {
    console.log(e.target.files)
    setFile4(e.target.files[0])
  }
  const selectedFile5 = (e) => {
    console.log(e.target.files)
    setFile5(e.target.files[0])
  }

  const removeFile = () => {
    setFile(null)
  }
  const removeFile2 = () => {
    setFile2(null)
  }
  const removeFile3 = () => {
    setFile3(null)
  }
  const removeFile4 = () => {
    setFile4(null)
  }
  const removeFile5 = () => {
    setFile5(null)
  }

  return (
    <MobileLayout>
  <div className={'md:shadow-2xl bg-[#F7F8FA] h-fit flex items-center flex-col'}>
    <Nav location={'Validación Vehiculo'}/>
    { mounted && next === 1 &&
      <div className={'flex flex-col justify-center w-full'}>
        <div className='flex flex-col justify-center items-center'>
          <div className='flex flex-col justify-center items-center'>
            <Image src={validationHero} alt="hero" className={'w-3/4'}/>
          </div>
          <div className='flex flex-col justify-center items-center text-center mt-20'>
            <h2 className={'font-bold text-2xl ml-8 mr-8'}>Para validar su vehiculo necesitamos algunos documentos.</h2>
            <p className='mt-8 ml-8 mr-8'>No te preocupes una vez los envies nuestro equipo lo revisara en un plazo menor a 48 horas.</p>
          </div>
          <div className={'w-full m-5 pl-16 pr-16'}>
          <button className={'w-full rounded-[25px] h-[50px] text-white bg-[#5B211F]'}
            onClick={() => nextStep()}>Aceptar</button>
          </div>
        </div>
      </div>
    }
    { mounted && next === 2 &&
    <>
    <div className='flex flex-col justify-between w-full h-full pb-20 '>
       <div className={'flex flex-col justify-center w-full items-center'}>
        {
          !file
            ? (<div className='flex flex-col justify-center items-center'>
          <div className='flex flex-col justify-center items-center'>
            <form onSubmit={submit}>
          <div className={'w-[282px] m-2 flex flex-col text-center'}>
            <label className={'flex items-center flex-col justify-center outline-0 w-full rounded h-fit font-bold text-black bg-[#e2e3e2]'}>
              <input placeholder={'Revision Tecnomecanica'}
                     type={'file'}
                     style={{ display: 'none' }}
                     onChange={selectedFile}
                     name={'capacity'}
                     value={input.capacity}
              />
              <DocumentTextIcon className={'h-[60px] stroke-[0.7px]'}></DocumentTextIcon>
            </label>
            <h2 className='text-black font-bold outline-0'>Revisión Tecnomecánica</h2>
          </div>
          </form>
          </div>
        </div>)
            : (
            <div className='flex flex-col justify-center items-center'>
              <div className='flex flex-col justify-center items-center'>
                <CheckCircleIcon className={'text-green-400 h-[60px]'}></CheckCircleIcon>
                <div>
                <h2 className='text-black font-bold outline-0'>Revisión Tecnomecánica</h2>
                </div>
              </div>
              <div className='bg-[#ebeaea] rounded-lg cursor-pointer'>
                <XMarkIcon className={'text-red-400 h-[25px]'} onClick={removeFile}></XMarkIcon>
              </div>
        </div>
              )
        }
      </div>
      <div className={'flex flex-col justify-center w-full mt-5 items-center'}>
        {
          !file2
            ? (
            <div className='flex flex-col justify-center items-center'>
          <div className='flex flex-col justify-center items-center'>
            <form onSubmit={submit}>
          <div className={'w-[282px] m-2 flex flex-col text-center'}>
            <label className={'flex items-center flex-col justify-center outline-0 w-full rounded h-fit font-bold text-black bg-[#e2e3e2]'}>
              <input placeholder={'Poliza Contractual'}
                     type={'file'}
                     style={{ display: 'none' }}
                     onChange={selectedFile2}
                     name={'capacity'}
                     value={input.capacity}
              />
              <DocumentTextIcon className={'h-[60px] stroke-[0.7px]'}></DocumentTextIcon>
            </label>
            <h2 className='text-black font-bold outline-0'>Poliza Contractual</h2>
          </div>
          </form>
          </div>
        </div>
              )
            : (
            <div className='flex flex-col justify-center items-center'>
              <div className='flex flex-col justify-center items-center'>
                <CheckCircleIcon className={'text-green-400 h-[60px]'}></CheckCircleIcon>
                <div>
                <h2 className='text-black font-bold outline-0'>Poliza Contractual</h2>
                </div>
                <div className='bg-[#ebeaea] rounded-lg cursor-pointer'>
                <XMarkIcon className={'text-red-400 h-[25px]'} onClick={removeFile2}></XMarkIcon>
              </div>
              </div>
        </div>
              )
        }
         <div className='flex flex-row'>
        <div className={'flex flex-col justify-center items-center mt-4 mr-6'}>
        <h3 className='text-black font-bold outline-0'>Fecha de expedición</h3>
        <input placeholder={'Numero de licencia'}
                   className={'outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#e2e3e2]'}
                   name={'poliza_exp'}
                   type={'date'}
                   value={input.poliza_exp}
                   onChange={(e) => handleChange(e)}/>
        </div>
        <div className={'flex flex-col justify-center items-center mt-4'}>
        <h3 className='text-black font-bold outline-0'>Fecha de Vencimiento</h3>
        <input placeholder={'Numero de licencia'}
                   className={'outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#e2e3e2]'}
                   name={'poliza_ven'}
                   type={'date'}
                   value={input.poliza_ven}
                   onChange={(e) => handleChange(e)}/>
        </div>
        </div>
      </div>
      <div className={'flex flex-col justify-center w-full mt-5 items-center'}>
        {
          !file3
            ? (
            <div className='flex flex-col justify-center items-center'>
          <div className='flex flex-col justify-center items-center'>
            <form onSubmit={submit}>
          <div className={'w-[282px] m-2 flex flex-col text-center'}>
            <label className={'flex items-center flex-col justify-center outline-0 w-full rounded h-fit font-bold text-black bg-[#e2e3e2]'}>
              <input placeholder={'SOAT'}
                     type={'file'}
                     style={{ display: 'none' }}
                     onChange={selectedFile3}
                     name={'capacity'}
                     value={input.capacity}
              />
              <DocumentTextIcon className={'h-[60px] stroke-[0.7px]'}></DocumentTextIcon>
            </label>
            <h2 className='text-black font-bold outline-0'>SOAT</h2>
          </div>
          </form>
          </div>
        </div>
              )
            : (
            <div className='flex flex-col justify-center items-center'>
              <div className='flex flex-col justify-center items-center'>
                <CheckCircleIcon className={'text-green-400 h-[60px]'}></CheckCircleIcon>
                <div>
                <h2 className='text-black font-bold outline-0'>SOAT</h2>
                </div>
                <div className='bg-[#ebeaea] rounded-lg cursor-pointer'>
                <XMarkIcon className={'text-red-400 h-[25px]'} onClick={removeFile3}></XMarkIcon>
              </div>
              </div>
        </div>
              )
        }
        <div className='flex flex-row'>
        <div className={'flex flex-col justify-center items-center mt-4 mr-6'}>
        <h3 className='text-black font-bold outline-0'>Fecha de expedición</h3>
        <input placeholder={'Numero de licencia'}
                   className={'outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#e2e3e2]'}
                   name={'soat_exp'}
                   type={'date'}
                   value={input.soat_exp}
                   onChange={(e) => handleChange(e)}/>
        </div>
        <div className={'flex flex-col justify-center items-center mt-4'}>
        <h3 className='text-black font-bold outline-0'>Fecha de Vencimiento</h3>
        <input placeholder={'Numero de licencia'}
                   className={'outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#e2e3e2]'}
                   name={'soat_ven'}
                   type={'date'}
                   value={input.soat_ven}
                   onChange={(e) => handleChange(e)}/>
        </div>
        </div>
      </div>
      <div className={'flex flex-col justify-center w-full mt-5 items-center'}>
        {
          !file4
            ? (
            <div className='flex flex-col justify-center items-center'>
          <div className='flex flex-col justify-center items-center'>
            <form onSubmit={submit}>
          <div className={'w-[282px] m-2 flex flex-col text-center'}>
            <label className={'flex items-center flex-col justify-center outline-0 w-full rounded h-fit font-bold text-black bg-[#e2e3e2]'}>
              <input placeholder={'Imagen cedula frontal'}
                     type={'file'}
                     style={{ display: 'none' }}
                     onChange={selectedFile4}
                     name={'capacity'}
                     value={input.capacity}
              />
              <CreditCardIcon className={'h-[60px] stroke-[0.7px]'}></CreditCardIcon>
            </label>
            <h2 className='text-black font-bold outline-0'>Tarjeta de Propiedad Frontal</h2>
          </div>
          </form>
          </div>
        </div>
              )
            : (
            <div className='flex flex-col justify-center items-center'>
              <div className='flex flex-col justify-center items-center'>
                <CheckCircleIcon className={'text-green-400 h-[60px]'}></CheckCircleIcon>
                <div>
                <h2 className='text-black font-bold outline-0'>Tarjeta de Propiedad Frontal</h2>
                </div>
                <div className='bg-[#ebeaea] rounded-lg cursor-pointer'>
                <XMarkIcon className={'text-red-400 h-[25px]'} onClick={removeFile4}></XMarkIcon>
              </div>
              </div>
        </div>
              )
        }
      </div>
      <div className={'flex flex-col justify-center w-full mt-5'}>
        {
          !file5
            ? (
            <div className='flex flex-col justify-center items-center'>
          <div className='flex flex-col justify-center items-center'>
            <form onSubmit={submit}>
          <div className={'w-[282px] m-2 flex flex-col text-center'}>
            <label className={'flex items-center flex-col justify-center outline-0 w-full rounded h-fit font-bold text-black bg-[#e2e3e2]'}>
              <input placeholder={'Imagen cedula frontal'}
                     type={'file'}
                     style={{ display: 'none' }}
                     onChange={selectedFile5}
                     name={'capacity'}
                     value={input.capacity}
              />
              <CreditCardIcon className={'h-[60px] stroke-[0.7px]'}></CreditCardIcon>
            </label>
            <h2 className='text-black font-bold outline-0'>Tarjeta de Propiedad Trasera</h2>
          </div>
          </form>
          </div>
        </div>
              )
            : (
            <div className='flex flex-col justify-center items-center'>
              <div className='flex flex-col justify-center items-center'>
                <CheckCircleIcon className={'text-green-400 h-[60px]'}></CheckCircleIcon>
                <div>
                <h2 className='text-black font-bold outline-0'>Tarjeta de Propiedad Trasera</h2>
                </div>
                <div className='bg-[#ebeaea] rounded-lg cursor-pointer'>
                <XMarkIcon className={'text-red-400 h-[25px]'} onClick={removeFile5}></XMarkIcon>
              </div>
              </div>
        </div>
              )
        }

      </div>
      <div className={'flex flex-col justify-center w-full mt-5'}>
        <div className='flex flex-col justify-center items-center'>
          <div className='flex flex-col justify-center items-center'>
            <form onSubmit={submit} className={'w-full m-5 flex justify-center items-center flex-col'}>

          <div className={'w-full m-5 pr-16 pl-16 mt-5'}>
          <button className={'w-full rounded-[25px] h-[50px] text-white bg-[#5B211F]'} type={'submit'}>Enviar</button>
          </div>
          <ToastContainer />
          </form>
          </div>
        </div>
      </div>
      </div>
    </>
    }
    {
      mounted && next === 3 &&
      <>
      <div className='flex flex-col justify-center items-center mt-20'>
        <div className='flex flex-col justify-center items-center'>
          <Player
            autoplay
            loop
            src="https://assets3.lottiefiles.com/packages/lf20_mkelocrp.json"
            style={{ height: '150px', width: '150px' }}>
              <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
            </Player>
        </div>
        <div className='flex flex-col justify-center items-center text-center'>
        <h3 className={'ml-8 mr-8 text-xl mt-10'}>
          La solicitud para validar tu vehiculo ha sido enviada. Este proceso puede tardar hasta 48 horas. Te notificaremos por correo electrónico cuando tu cuenta haya sido validada.
        </h3>
        </div>
      </div>
      </>
    }
    </div>
    </MobileLayout>
  )
}
