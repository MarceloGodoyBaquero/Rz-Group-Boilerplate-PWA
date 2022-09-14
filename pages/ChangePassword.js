import React, { useState } from 'react'
import Nav from '../components/Nav'
import Image from 'next/image'
import ChangePassword from '../public/Images/ChangePassword.svg'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import MobileLayout from '../components/MobileLayout'
import { useDispatch } from 'react-redux'
import { recoverPassword } from '../Redux/Actions/authActions/'
import { useRouter } from 'next/router'

function validate (input) {
  const errors = {}
  if (!input.password) {
    errors.password = 'Password is required'
  } else if (input.password.length < 8) {
    errors.password = 'Password must be at least 8 characters'
  } else if (!(/^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/.test(input.password))) {
    errors.password = 'Password must contain at least one uppercase letter, one lowercase letter and one number'
  }
  if (!input.repeatPassword) {
    errors.repeatPassword = 'Confirm password is required'
  } else if (input.password !== input.repeatPassword) {
    errors.repeatPassword = 'Passwords must match'
  }
  return errors
}

export default function SignIn () {
  const [showPassword1, setShowPassword1] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()
  const { email } = router.query
  const [input, setInput] = useState({
    password: '',
    repeatPassword: '',
    code: '',
    email
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
    if (Object.keys(errors).length > 0) {
      alert('Please fill all the fields correctly')
    }
    dispatch(recoverPassword(input, router))
  }
  return (
    <MobileLayout>
      <div className={' md:shadow-2xl bg-[#F7F8FA] h-screen flex items-center flex-col'}>
        <Nav location={'Cambiar contraseña'}/>
        <Image width={'274px'} height={'287px'} src={ChangePassword} alt="hero" className={'w-3/4'}/>
        <div className={'bg-white rounded-xl p-5 m-5 w-5/6 h-fit flex flex-col items-center justify-center shadow-lg'}>
        <div className={'w-full m-2 flex h-[50px] items-center'}>
          <input
              placeholder={'Código OTP'}
              type={'text'}
              name={'code'}
              value={input.code}
              onChange={(e) => handleInputChange(e)}
              className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}/>
          </div>
          <div className={'w-full m-2 flex h-[50px] items-center'}>
            <input
              placeholder={'Contraseña'}
              name={'password'}
              value={input.password}
              onChange={(e) => handleInputChange(e)}
              type={showPassword1 ? 'text' : 'password'}
              className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}/>
            {!showPassword1
              ? <EyeIcon
                onClick={() => setShowPassword1(!showPassword1)}
                className={'cursor-pointer text-[#B8B8B8] h-[40px] w-1/5'}/>
              : <EyeSlashIcon
                onClick={() => setShowPassword1(!showPassword1)}
                className={'cursor-pointer text-[#B8B8B8] h-[40px] w-1/5'}/>}
          </div>
          <div className={'w-full m-2 flex h-[50px] items-center'}>
            <input
              placeholder={'Repetir Contraseña'}
              name={'repeatPassword'}
              value={input.repeatPassword}
              onChange={(e) => handleInputChange(e)}
              type={showPassword2 ? 'text' : 'password'}
              className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}/>
            {!showPassword2
              ? <EyeIcon
                onClick={() => setShowPassword2(!showPassword2)}
                className={'cursor-pointer text-[#B8B8B8] h-[40px] w-1/5'}/>
              : <EyeSlashIcon
                onClick={() => setShowPassword2(!showPassword2)}
                className={'cursor-pointer text-[#B8B8B8] h-[40px] w-1/5'}/>}
          </div>
          <div className={'w-full m-2'}>
            <button className={'w-full rounded-[25px] h-[50px] text-white bg-[#5B211F]'}
            onClick={(e) => handleSubmit(e)}>Cambiar</button>
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}
