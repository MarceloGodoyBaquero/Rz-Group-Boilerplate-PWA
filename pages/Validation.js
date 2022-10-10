import dynamic from 'next/dynamic'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import validationHero from '../public/Images/OnBoarding-3.svg'
import Image from 'next/image'
import { signOut } from '../Redux/Actions/authActions'
import {
  IdentificationIcon,
  CreditCardIcon,
  DocumentTextIcon,
  CloudArrowUpIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { Player, Controls } from '@lottiefiles/react-lottie-player'

const Nav = dynamic(() => import('../components/Nav'), { ssr: false })

export default function Validation () {
  const { user } = useSelector(state => state)
  const dispatch = useDispatch()
  const [mounted, setMounted] = useState(false)
  const [status, setStatus] = useState('')
  const [file, setFile] = useState(null)
  const [file2, setFile2] = useState(null)
  const [file3, setFile3] = useState(null)
  const [file4, setFile4] = useState(null)
  const [file5, setFile5] = useState(null)
  const [file6, setFile6] = useState(null)
  const [file7, setFile7] = useState(null)
  const [input, setInput] = useState({
    nro_license: '',
    nro_license_ven: ''
  })
  const [next, setNext] = useState(1)
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleVerified = () => {
    setNext(3)
    toast.success('¡Felicidades! Tu cuenta ha sido aprobada, vuelve a iniciar sesión.', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
    dispatch(signOut())
  }

  useEffect(() => {
    axios.get(`https://rz-group-backend.herokuapp.com/api/user/${user.id}`)
      .then(res => {
        setStatus(res.data.isAproved)
        console.log(res.data.isAproved)
        status === 'inReview'
          ? setNext(3)
          : status === 'aproved'
            ? handleVerified()
            : setNext(1)
        console.log(status)
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
    if (!file || !file2 || !file3 || !file4 || !file5 || !file6) {
      e.preventDefault()
      return errorToast('Por favor suba todos los archivos')
    }
    if (!input.nro_license) {
      e.preventDefault()
      return errorToast('Por favor ingrese su numero de licencia')
    }
    if (!input.nro_license_ven) {
      e.preventDefault()
      return errorToast('Por favor ingrese la fecha de vencimiento de su licencia')
    }
    e.preventDefault()
    const formData = new FormData()
    formData.append('nro_license', input.nro_license)
    formData.append('nro_license_ven', input.nro_license_ven)
    formData.append('idPictureFront', file)
    formData.append('idPictureBack', file2)
    formData.append('licensePictureFront', file3)
    formData.append('licensePictureback', file4)
    formData.append('curso_aux', file5)
    formData.append('curso_ESNA', file6)
    formData.append('carta_auth', file7)
    axios.post(`https://rz-group-backend.herokuapp.com/api/user/upload/${user.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      successToast()
      setNext(3)
    }).catch(err => {
      errorToast(err.response.data.message)
    })
  }
  const handleChangeDate = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }
  const handleChange = (e) => {
    const re = /^[0-9\b]+$/
    if (e.target.value === '' || re.test(e.target.value)) {
      setInput({
        ...input,
        [e.target.name]: e.target.value
      })
    }
  }
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
  const selectedFile6 = (e) => {
    console.log(e.target.files)
    setFile6(e.target.files[0])
  }
  const selectedFile7 = (e) => {
    console.log(e.target.files)
    setFile7(e.target.files[0])
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
  const removeFile6 = () => {
    setFile6(null)
  }
  const removeFile7 = () => {
    setFile7(null)
  }

  return (
    <div className={'md:shadow-2xl bg-[#F7F8FA] h-fit flex items-center flex-col'}>
      <Nav location={'Validación Conductor'}/>
      {mounted && status !== '' && status !== 'aproved' && status !== 'inReview' && next === 1 &&
        <div className={'flex flex-col justify-center w-full'}>
          <div className='flex flex-col justify-center items-center'>
            <div className='flex flex-col justify-center items-center'>
              <Image src={validationHero} alt="hero" className={'w-3/4'}/>
            </div>
            <div className='flex flex-col justify-center items-center text-center mt-20'>
              <h2 className={'font-bold text-2xl ml-8 mr-8'}>Para utilizar el servicio necesitamos validar algunos
                documentos.</h2>
              <p className='mt-8 ml-8 mr-8'>No te preocupes una vez los envies nuestro equipo lo revisara en un plazo
                menor a 48 horas.</p>
            </div>
            <div className={'w-full m-5 pl-16 pr-16'}>
              <button className={'w-full rounded-[25px] h-[50px] text-white bg-[#5B211F]'}
                      onClick={() => nextStep()}>Aceptar
              </button>
            </div>
          </div>
        </div>
      }
      {mounted && next === 2 &&
        <>
          <div className='flex flex-col justify-between w-full h-full pb-20 '>
            <div className={'flex flex-col justify-center w-full items-center'}>
              {
                !file
                  ? (<div className='flex flex-col justify-center items-center'>
                    <div className='flex flex-col justify-center items-center'>
                      <form onSubmit={submit}>
                        <div className={'w-[282px] m-2 flex flex-col text-center'}>
                          <label
                            className={'flex items-center flex-col justify-center outline-0 w-full rounded h-fit font-bold text-black bg-[#e2e3e2]'}>
                            <input placeholder={'Imagen cedula frontal'}
                                   type={'file'}
                                   style={{ display: 'none' }}
                                   onChange={selectedFile}
                                   name={'capacity'}
                                   value={input.capacity}
                            />
                            <IdentificationIcon className={'h-[60px] stroke-[0.7px]'}></IdentificationIcon>
                          </label>
                          <h2 className='text-black font-bold outline-0'>Imagen cedula frontal</h2>
                        </div>
                      </form>
                    </div>
                  </div>)
                  : (
                    <div className='flex flex-col justify-center items-center'>
                      <div className='flex flex-col justify-center items-center'>
                        <CheckCircleIcon className={'text-green-400 h-[60px]'}></CheckCircleIcon>
                        <div>
                          <h2 className='text-black font-bold outline-0'>Imagen cedula frontal</h2>
                        </div>
                      </div>
                      <div className='bg-[#ebeaea] rounded-lg cursor-pointer'>
                        <XMarkIcon className={'text-red-400 h-[25px]'} onClick={removeFile}></XMarkIcon>
                      </div>
                    </div>
                    )
              }
            </div>
            <div className={'flex flex-col justify-center w-full mt-5'}>
              {
                !file2
                  ? (
                    <div className='flex flex-col justify-center items-center'>
                      <div className='flex flex-col justify-center items-center'>
                        <form onSubmit={submit}>
                          <div className={'w-[282px] m-2 flex flex-col text-center'}>
                            <label
                              className={'flex items-center flex-col justify-center outline-0 w-full rounded h-fit font-bold text-black bg-[#e2e3e2]'}>
                              <input placeholder={'Imagen cedula frontal'}
                                     type={'file'}
                                     style={{ display: 'none' }}
                                     onChange={selectedFile2}
                                     name={'capacity'}
                                     value={input.capacity}
                              />
                              <CreditCardIcon className={'h-[60px] stroke-[0.7px]'}></CreditCardIcon>
                            </label>
                            <h2 className='text-black font-bold outline-0'>Imagen cedula trasera</h2>
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
                          <h2 className='text-black font-bold outline-0'>Imagen cedula trasera</h2>
                        </div>
                        <div className='bg-[#ebeaea] rounded-lg cursor-pointer'>
                          <XMarkIcon className={'text-red-400 h-[25px]'} onClick={removeFile2}></XMarkIcon>
                        </div>
                      </div>
                    </div>
                    )
              }

            </div>
            <div className={'flex flex-col justify-center w-full mt-5'}>
              {
                !file3
                  ? (
                    <div className='flex flex-col justify-center items-center'>
                      <div className='flex flex-col justify-center items-center'>
                        <form onSubmit={submit}>
                          <div className={'w-[282px] m-2 flex flex-col text-center'}>
                            <label
                              className={'flex items-center flex-col justify-center outline-0 w-full rounded h-fit font-bold text-black bg-[#e2e3e2]'}>
                              <input placeholder={'Imagen cedula frontal'}
                                     type={'file'}
                                     style={{ display: 'none' }}
                                     onChange={selectedFile3}
                                     name={'capacity'}
                                     value={input.capacity}
                              />
                              <CloudArrowUpIcon className={'h-[60px] stroke-[0.7px]'}></CloudArrowUpIcon>
                            </label>
                            <h2 className='text-black font-bold outline-0'>Imagen licencia de conducir frontal</h2>
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
                          <h2 className='text-black font-bold outline-0'>Imagen licencia de conducir frontal</h2>
                        </div>
                        <div className='bg-[#ebeaea] rounded-lg cursor-pointer'>
                          <XMarkIcon className={'text-red-400 h-[25px]'} onClick={removeFile3}></XMarkIcon>
                        </div>
                      </div>
                    </div>
                    )
              }

            </div>
            <div className={'flex flex-col justify-center w-full mt-5 items-center'}>
              {
                !file4
                  ? (
                    <div className='flex flex-col justify-center items-center'>
                      <div className='flex flex-col justify-center items-center'>
                        <form onSubmit={submit}>
                          <div className={'w-[282px] m-2 flex flex-col text-center'}>
                            <label
                              className={'flex items-center flex-col justify-center outline-0 w-full rounded h-fit font-bold text-black bg-[#e2e3e2]'}>
                              <input placeholder={'Imagen cedula frontal'}
                                     type={'file'}
                                     style={{ display: 'none' }}
                                     onChange={selectedFile4}
                                     name={'capacity'}
                                     value={input.capacity}
                              />
                              <CloudArrowUpIcon className={'h-[60px] stroke-[0.7px]'}></CloudArrowUpIcon>
                            </label>
                            <h2 className='text-black font-bold outline-0'>Imagen licencia de conducir trasera</h2>
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
                          <h2 className='text-black font-bold outline-0'>Imagen licencia de conducir trasera</h2>
                        </div>
                        <div className='bg-[#ebeaea] rounded-lg cursor-pointer'>
                          <XMarkIcon className={'text-red-400 h-[25px]'} onClick={removeFile4}></XMarkIcon>
                        </div>
                      </div>
                    </div>
                    )
              }
              <div className={'flex flex-col justify-center items-center mt-5'}>
                <input placeholder={'Numero de licencia'}
                       className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                       name={'nro_license'}
                       value={input.nro_license}
                       onChange={(e) => handleChange(e)}/>
              </div>
              <div className={'flex flex-col justify-center items-center mt-5'}>
                <label className='text-black font-bold outline-0'> Fecha de vencimiento</label>
                <input type={'date'}
                       name={'nro_license_ven'}
                       value={input.nro_license_ven}
                       onChange={(e) => handleChangeDate(e)}/>
              </div>
            </div>

            <div className={'flex flex-col justify-center w-full mt-5'}>
              {
                !file7
                  ? (
                    <div className='flex flex-col justify-center items-center'>
                      <div className='flex flex-col justify-center items-center'>
                        <form onSubmit={submit}>
                          <div className={'w-[282px] m-2 flex flex-col text-center'}>
                            <label
                              className={'flex items-center flex-col justify-center outline-0 w-full rounded h-fit font-bold text-black bg-orange-300'}>
                              <input placeholder={'Imagen cedula frontal'}
                                     type={'file'}
                                     style={{ display: 'none' }}
                                     onChange={selectedFile7}
                                     name={'capacity'}
                                     value={input.capacity}
                              />
                              <CloudArrowUpIcon className={'h-[60px] stroke-[0.7px]'}></CloudArrowUpIcon>
                            </label>
                            <h2 className='text-black font-bold outline-0'>Imagen de Carta de Autorización (Opcional en caso de no ser propietario)</h2>
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
                          <h2 className='text-black font-bold outline-0'>Imagen carta de autorización (Opcional en caso de no ser propietario)</h2>
                        </div>
                        <div className='bg-[#ebeaea] rounded-lg cursor-pointer'>
                          <XMarkIcon className={'text-red-400 h-[25px]'} onClick={removeFile7}></XMarkIcon>
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
                            <label
                              className={'flex items-center flex-col justify-center outline-0 w-full rounded h-fit font-bold text-black bg-[#e2e3e2]'}>
                              <input placeholder={'Imagen cedula frontal'}
                                     type={'file'}
                                     style={{ display: 'none' }}
                                     onChange={selectedFile5}
                                     name={'capacity'}
                                     value={input.capacity}
                              />
                              <DocumentTextIcon className={'h-[60px] stroke-[0.7px]'}></DocumentTextIcon>
                            </label>
                            <h2 className='text-black font-bold outline-0'>Certificado curso gratuito primeros
                              auxilios</h2>
                            <div className='mt-5'>
                              ¿No tienes certificado?
                              <a
                                href="https://surcos.org/web/primeros-auxilios-y-rcp-en-adultos-mayores-institucionalizados/"
                                target='blank' className='no-underline text-[#5B211F] pl-2'>
                                Click aqui para obtenerlo.
                              </a>
                            </div>
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
                          <h2 className='text-black font-bold outline-0'>Certificado curso gratuito primeros auxilios</h2>
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
                    {
                      !file6
                        ? (
                          <div className={'w-[282px] m-2 flex flex-col text-center'}>
                            <label
                              className={'flex items-center flex-col justify-center outline-0 w-full rounded h-fit font-bold text-black bg-[#e2e3e2]'}>
                              <input placeholder={'Imagen cedula frontal'}
                                     type={'file'}
                                     style={{ display: 'none' }}
                                     onChange={selectedFile6}
                                     name={'capacity'}
                                     value={input.capacity}
                              />
                              <DocumentTextIcon className={'h-[60px] stroke-[0.7px]'}></DocumentTextIcon>
                            </label>
                            <h2 className='text-black font-bold outline-0'>Certificado del curso ESNA</h2>
                            <div className='mt-5'>
                              ¿No tienes certificado?
                              <a href="http://escnna.mincit.gov.co/" target='blank'
                                 className='no-underline text-[#5B211F] pl-2'>
                                Click aqui para obtenerlo.
                              </a>
                            </div>
                          </div>
                          )
                        : (
                          <div className='flex flex-col justify-center items-center'>
                            <div className='flex flex-col justify-center items-center'>
                              <CheckCircleIcon className={'text-green-400 h-[60px]'}></CheckCircleIcon>
                              <div>
                                <h2 className='text-black font-bold outline-0'>Certificado del curso ESNA</h2>
                              </div>
                              <div className='bg-[#ebeaea] rounded-lg cursor-pointer'>
                                <XMarkIcon className={'text-red-400 h-[25px]'} onClick={removeFile6}></XMarkIcon>
                              </div>
                            </div>
                          </div>
                          )
                    }

                    <div className={'w-full m-5 pr-16 pl-16 mt-5'}>
                      <button className={'w-full rounded-[25px] h-[50px] text-white bg-[#5B211F]'}
                              type={'submit'}>Enviar
                      </button>
                    </div>
                    <ToastContainer/>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      }
      {
        mounted && status && next === 3 &&
        <>
          <div className='flex flex-col justify-center items-center mt-20'>
            <div className='flex flex-col justify-center items-center'>
              <Player
                autoplay
                loop
                src="https://assets3.lottiefiles.com/packages/lf20_mkelocrp.json"
                style={{ height: '150px', width: '150px' }}>
                <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']}/>
              </Player>
            </div>
            <div className='flex flex-col justify-center items-center text-center'>
              <h3 className={'ml-8 mr-8 text-xl mt-10'}>
                La solicitud para validar tu cuenta ha sido enviada. Este proceso puede tardar hasta 48 horas. Te
                notificaremos por correo electrónico cuando tu cuenta haya sido validada.
              </h3>
            </div>
          </div>
        </>
      }
    </div>
  )
}
