import React, { useState } from 'react'
import Nav from '../components/Nav'
import Image from 'next/image'
import SignUp from '../public/Images/SignUp.svg'
import { useRouter } from 'next/router'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'

import MobileLayout from '../components/MobileLayout'
import { useDispatch } from 'react-redux'
import { signUp } from '../Redux/Actions/authActions/'

function validate (input) {
  const errors = {}
  if (!input.firstName) {
    errors.firstName = 'First Name is required'
  } else if (input.firstName.trim() === '') {
    errors.firstName = 'Name may not be empty'
  }
  if (!input.lastName) {
    errors.lastName = 'Last Name is required'
  } else if (input.lastName.trim() === '') {
    errors.firstName = 'Name may not be empty'
  }
  if (!input.email) {
    errors.email = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    errors.email = 'Email is invalid'
  }
  if (!input.idNumber) {
    errors.idNumber = 'ID Number is required'
  } else if (!/^\d{10}$/.test(input.idNumber)) {
    errors.idNumber = 'ID Number is invalid'
  }
  if (!input.phoneNumber) {
    errors.phoneNumber = 'Phone Number is required'
  } else if (!/^\d{10}$/.test(input.phoneNumber)) {
    errors.phoneNumber = 'Phone Number is invalid'
  }
  if (!input.roles.length) {
    errors.roles = 'Role is required'
  }
  if (!input.password) {
    errors.password = 'Password is required'
  } else if (input.password.length < 8) {
    errors.password = 'Password must be at least 6 characters'
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
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()
  const [input, setInput] = useState(
    {
      firstName: '',
      lastName: '',
      email: '',
      idNumber: '',
      phoneNumber: '',
      password: '',
      repeatPassword: '',
      roles: []
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
  const handleCheckboxChange = function (e) {
    setError(validate({
      ...input,
      roles: e.currentTarget.value
    }))
    setInput({
      ...input,
      roles: [e.currentTarget.value]
    })
  }
  const handleSubmit = function (e) {
    e.preventDefault()
    const errors = validate(input)
    console.log(errors)
    if (Object.keys(errors).length > 0) {
      alert('Please fill in all the required fields')
    } else {
      dispatch(signUp(input))
      alert('ta listo papa')
    }
  }

  console.log(input)
  return (
    <MobileLayout>
      <div className={'md:shadow-2xl bg-[#F7F8FA] h-screen flex items-center flex-col'}>
        <Nav location={'Sign Up'}/>
        <div className={'h-1/2 flex justify-center'}>
          <Image width={'274px'} height={'287px'} src={SignUp} alt="hero" className={'w-3/4'}/>
        </div>
        <div className={'bg-white rounded-xl p-5 m-5 w-5/6 h-fit flex flex-col items-center justify-center shadow-lg'}>
          <div className={'m-2 w-full h-fit flex flex-col items-center justify-center'}>
            <h2 className={'font-bold text-2xl'}>Sign Up</h2>
            <h2>Please complete all the fields</h2>
          </div>

          <div className={'w-full m-2 pl-5 pr-5 flex flex-row justify-between'}>
            <label>
              <input type={'radio'} name={'radio'} value={'driver'}
              onChange={(e) => handleCheckboxChange(e)}/>
              Driver
            </label>
            <label>
              <input type={'radio'} name={'radio'} value={'client'}
              onChange={(e) => handleCheckboxChange(e)}/>
              Rider
            </label>
          </div>

          <div className={'w-full m-2'}>
            <input placeholder={'First Name'}
                   className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                   onChange={(e) => handleInputChange(e)}
                   name={'firstName'}
                   value={input.firstName}
                   />
          </div>
          <div className={'w-full m-2'}>
            <input placeholder={'Last Name'}
                   className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                   onChange={(e) => handleInputChange(e)}
                   name={'lastName'}
                   value={input.lastName}
                   />
          </div>
          <div className={'w-full m-2'}>
            <input placeholder={'Email'}
                   className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                   onChange={(e) => handleInputChange(e)}
                   name={'email'}
                   value={input.email}
                   />
          </div>
          <div className={'w-full m-2'}>
            <input placeholder={'ID number'}
                   className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                   onChange={(e) => handleInputChange(e)}
                   name={'idNumber'}
                   value={input.idNumber}
                   />
          </div>
          <div className={'w-full m-2'}>
            <input placeholder={'Phone Number'}
                   className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                   onChange={(e) => handleInputChange(e)}
                   name={'phoneNumber'}
                   value={input.phoneNumber}
                   />
          </div>

          <div className={'w-full m-2 flex h-[50px] items-center'}>
            <input placeholder={'Password'}
            onChange={(e) => handleInputChange(e)}
            name={'password'}
            value={input.password}
                   type={showPassword ? 'text' : 'password'}
                   className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}/>
            {!showPassword
              ? <EyeIcon onClick={() => setShowPassword(!showPassword)}
                                      className={'cursor-pointer text-[#B8B8B8] h-[40px] w-1/5'}/>
              : <EyeSlashIcon onClick={() => setShowPassword(!showPassword)}
                            className={'cursor-pointer text-[#B8B8B8] h-[40px] w-1/5'}
                            />}
          </div>
          <div className={'w-full m-2 flex h-[50px] items-center'}>
            <input placeholder={' Repeat Password'}
                   onChange={(e) => handleInputChange(e)}
                   name={'repeatPassword'}
                   value={input.repeatPassword}
                   type={showPassword ? 'text' : 'password'}
                   className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}/>
            {!showPassword
              ? <EyeIcon onClick={() => setShowPassword(!showPassword)}
                                      className={'cursor-pointer text-[#B8B8B8] h-[40px] w-1/5'}/>
              : <EyeSlashIcon onClick={() => setShowPassword(!showPassword)}
                            className={'cursor-pointer text-[#B8B8B8] h-[40px] w-1/5'}/>}
          </div>
          <div className={'w-full m-2'}>
            <button className={'w-full rounded-[25px] h-[50px] text-white bg-[#3A56FF]'} onClick={(e) => handleSubmit(e)}>SIGN UP</button>
          </div>
        </div>
        <div className={'m-2 w-full h-fit flex flex-col items-center justify-center'}>
          <h2>Already have an account? <span onClick={() => router.push('/SignIn')}
                                          className={'text-[#3A56FF] font-bold cursor-pointer'}>Sign in</span></h2>
          <h2 onClick={() => router.push('/ForgetPassword')}
              className={'mt-2 text-[#3A56FF] font-bold cursor-pointer'}>I forgot my password</h2>
        </div>
      </div>
    </MobileLayout>
  )
}
