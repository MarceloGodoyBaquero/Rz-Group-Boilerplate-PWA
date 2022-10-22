import React, { useState } from 'react'
import Nav from '../components/Nav'
import Image from 'next/image'
import LoginImage from '../public/Images/Login.svg'
import { useRouter } from 'next/router'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import { signIn } from '../Redux/Actions/authActions'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MobileLayout from '../components/MobileLayout'

export default function SignIn () {
  const router = useRouter()
  const user = useSelector(state => state.user)
  const [showPassword, setShowPassword] = useState(false)
  const [input, setInput] = useState({
    email: '',
    password: ''
  })
  const dispatch = useDispatch()
  function handleChange (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }
  if (user) {
    if (user.roles === 'admin') {
      router.push('/admin')
    }
    if (user.roles === 'driver' || user.roles === 'client') {
      router.push('/Main')
    }
  }

  function handleSubmit (e) {
    e.preventDefault()
    dispatch(signIn(input, router))
  }

  return (
    <MobileLayout>
      <div className={'md:shadow-2xl bg-[#F7F8FA] h-screen flex items-center flex-col'}>
      <ToastContainer/>
        <Nav location={'Iniciar Sesión'}/>
        <Image width={'274px'} height={'287px'} src={LoginImage} alt="hero" className={'w-3/4'}/>
        <form className={'bg-white rounded-xl p-5 m-5 w-5/6 h-fit flex flex-col items-center justify-center shadow-lg'}>
          <div className={'m-2 w-full h-fit flex flex-col items-center justify-center'}>
            <h2 className={'font-bold text-2xl'}>Login</h2>
            <h2>Con tu email y contraseña</h2>
          </div>
          <div className={'w-full m-2'}>
            <input placeholder={'Email'}
                   className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                   name={'email'}
                   value={input.email}
                   onChange={(e) => handleChange(e)}/>
          </div>
          <div className={'w-full m-2 flex h-[50px] items-center'}>
            <input placeholder={'Contraseña'}
                   autoComplete={'on'}
                   name={'password'}
                   value={input.password}
                   onChange={(e) => handleChange(e)}
                   type={showPassword ? 'text' : 'password'}
                   className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}/>
            {!showPassword
              ? <EyeIcon onClick={() => setShowPassword(!showPassword)}
                                      className={'cursor-pointer text-[#B8B8B8] h-[40px] w-1/5'}/>
              : <EyeSlashIcon onClick={() => setShowPassword(!showPassword)}
                            className={'cursor-pointer text-[#B8B8B8] h-[40px] w-1/5'}/>}
          </div>
          <div className={'w-full m-2'}>
            <button className={'w-full rounded-[25px] h-[50px] text-white bg-[#5B211F]'}
            onClick={(e) => handleSubmit(e)}>Ingresar</button>
          </div>
        </form>
        <div className={'m-2 w-full h-fit flex flex-col items-center justify-center'}>
          <h2>Todavía no tienes cuenta? <span onClick={() => router.push('/SignUp')}
                                          className={'text-[#5B211F] font-bold cursor-pointer'}>Registrate</span></h2>
          <h2 onClick={() => router.push('/ForgetPassword')} className={'mt-2 text-[#5B211F] font-bold cursor-pointer'}>Olvidé mi contraseña</h2>
        </div>
      </div>
    </MobileLayout>
  )
}
