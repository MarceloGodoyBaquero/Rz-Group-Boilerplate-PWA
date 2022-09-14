import React, { useState } from 'react'
import Nav from '../components/Nav'
import Image from 'next/image'
import ForgetPasswordImage from '../public/Images/ForgetPassword.svg'
import { useRouter } from 'next/router'
import MobileLayout from '../components/MobileLayout'
import { useDispatch } from 'react-redux'
import { sendOTP } from '../Redux/Actions/authActions'

export default function ForgetPassword () {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [popUp, setPopUp] = useState(false)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    setPopUp(true)
    dispatch(sendOTP({ email }, router))
  }

  return (
    <MobileLayout>
      <div className={'md:shadow-2xl bg-[#F7F8FA] h-screen flex items-center flex-col'}>
        <Nav location={'Recuperar contraseña'}/>
        <Image width={'274px'} height={'287px'} src={ForgetPasswordImage} alt="hero" className={'w-3/4'}/>
        <div className={'bg-white rounded-xl p-5 m-5 w-5/6 h-fit flex flex-col items-center justify-center shadow-lg'}>
          <div className={'m-2 w-3/4 text-center h-fit flex flex-col items-center justify-center'}>
            <h2>Le enviaremos un código a la dirección de correo electrónico que registró para recuperar su
              contraseña.</h2>
          </div>
          <div className={'w-full m-2'}>
            <input placeholder={'Email'}
                   name={'email'}
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}/>
          </div>
          <div className={'m-2 w-full h-fit flex flex-col items-center justify-center'}>
            {popUp && <h2 className={'text-green-700 font-bold'}>Código enviado a {email}</h2>}
          </div>
          <div className={'w-full m-2'}>
            <button className={'w-full rounded-[25px] h-[50px] text-white bg-[#5B211F]'}
                    onClick={(e) => handleSubmit(e)}>Enviar
            </button>
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}
