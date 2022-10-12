import Nav from '../components/Nav'
import Image from 'next/image'
import SignUp from '../public/Images/SignUp.svg'
import { useRouter } from 'next/router'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import { React, useState } from 'react'
import MobileLayout from '../components/MobileLayout'
import { useDispatch } from 'react-redux'
import { signUp } from '../Redux/Actions/authActions/'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
  } else if (input.idNumber.length < 3) {
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
  const [company, setCompany] = useState(false)
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
      company_code: '',
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
    // return a toast error with the message of the error
    if (Object.keys(errors).length > 0) {
      toast.error(Object.values(errors).join(' '))
    } else {
      dispatch(signUp(input, router))
    }
  }

  return (
    <MobileLayout>
      <div className={'md:shadow-2xl bg-[#F7F8FA] h-fit flex items-center flex-col'}>
        <ToastContainer/>
        <Nav location={'Registro'}/>
        <div className={'h-1/2 flex justify-center'}>
          <Image width={'274px'} height={'287px'} src={SignUp} alt="hero" className={'w-3/4'}/>
        </div>
        <div className={'bg-white rounded-xl p-5 m-5 w-5/6 h-fit flex flex-col items-center justify-center shadow-lg'}>
          <div className={'m-2 w-full h-fit flex flex-col items-center justify-center'}>
            <h2 className={'font-bold text-2xl'}>Registro</h2>
            <h2>Por favor, rellene todos los campos</h2>
          </div>

          <div className={'w-full m-2 pl-5 pr-5 flex flex-row justify-evenly'}>
            <label>
              <input type={'radio'} name={'radio'} value={'driver'}
              onChange={(e) => handleCheckboxChange(e)}/>
              Conductor
            </label>
            <label>
              <input type={'radio'} name={'radio'} value={'client'}
              onChange={(e) => handleCheckboxChange(e)}/>
              Cliente
            </label>
          </div>

          <div className={'w-full m-2'}>
            <input placeholder={'Nombre'}
                   className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                   onChange={(e) => handleInputChange(e)}
                   name={'firstName'}
                   value={input.firstName}
                   />
          </div>
          <div className={'w-full m-2'}>
            <input placeholder={'Apellido'}
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
            <input placeholder={'Cédula'}
                   className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                   onChange={(e) => handleInputChange(e)}
                   name={'idNumber'}
                   value={input.idNumber}
                   />
          </div>
          <div className={'w-full m-2'}>
            <input placeholder={'Teléfono'}
                   className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                   onChange={(e) => handleInputChange(e)}
                   name={'phoneNumber'}
                   value={input.phoneNumber}
                   />
          </div>
          {
            input.roles[0] === 'client'
              ? (
                <>
                <div className='flex flex-col justify-center items-center'>
                  <div className='flex flex-col justify-center items-center'>
                    <h2 className='font-bold text-md mb-8'>
                      ¿Vienes de parte de una empresa?
                    </h2>
                    <div className='flex flex-row justify-evenly items-center w-full mb-5'>
                    <div className='flex flex-row justify-center items-center'>
                      <label className='mr-5'>Si</label>
                      <input type="checkbox"
                            className='mr-2 rounded-full'
                            checked={company}
                            onChange={() => setCompany(true)}/>
                    </div>
                    <div>
                      <label className='mr-5'>No</label>
                      <input type="checkbox"
                            className='mr-2 rounded-full'
                            name='company_code'
                            checked={!company}
                            onChange={() => setCompany(false)}/>
                    </div>
                    </div>
                  </div>
                  {
                    company && (
                      <div className={'w-full m-2'}>
                <input placeholder='Introduce el codigo'
                        className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                        onChange={(e) => handleInputChange(e)}
                        name={'company_code'}
                        value={input.company_code}
                />
              </div>
                    )
                  }

              </div>
              </>
                )
              : null
          }

          <div className={'w-full m-2 flex h-[50px] items-center'}>
            <input placeholder={'Contraseña'}
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
            <input placeholder={'Repetir contraseña'}
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
            <button className={'w-full rounded-[25px] h-[50px] text-white bg-[#5B211F]'} onClick={(e) => handleSubmit(e)}>Registrarse</button>
          </div>
        </div>
        <div className={'m-2 w-full h-fit flex flex-col items-center justify-center'}>
          <h2>Ya tienes cuenta? <span onClick={() => router.push('/SignIn')}
                                          className={'text-[#5B211F] font-bold cursor-pointer'}>Iniciar sesión</span></h2>
          <h2 onClick={() => router.push('/ForgetPassword')}
              className={'mt-2 text-[#5B211F] font-bold cursor-pointer'}>Olvidé mi contraseña</h2>
        </div>
      </div>
    </MobileLayout>
  )
}
