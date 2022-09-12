import Nav from '../components/Nav'
import Image from 'next/image'
import SignUp from '../public/Images/OnBoarding-1.svg'
import { useRouter } from 'next/router'
import { React, useState } from 'react'
import MobileLayout from '../components/MobileLayout'
import { useDispatch } from 'react-redux'
import { signUp } from '../Redux/Actions/authActions/'

function validate (input) {
  const errors = {}
  if (!input.Name1) {
    errors.Name1 = 'First Name is required'
  } else if (input.Name1.trim() === '') {
    errors.Name1 = 'Name may not be empty'
  }
  if (!input.Origin) {
    errors.Origin = 'Last Name is required'
  } else if (input.Origin.trim() === '') {
    errors.Origin = 'Name may not be empty'
  }
  if (!input.Destination) {
    errors.Destination = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(input.Destination)) {
    errors.Destination = 'Email is invalid'
  }
  if (!input.idNumber) {
    errors.idNumber = 'ID Number is required'
  } else if (input.idNumber.length < 3) {
    errors.idNumber = 'ID Number is invalid'
  }
  return errors
}

export default function Fuec () {
  const router = useRouter()
  const dispatch = useDispatch()
  const [input, setInput] = useState(
    {
      Name1: '',
      Origin: '',
      Destination: '',
      Passengers: '',
      idNumber: ''
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
    console.log(errors)
    if (Object.keys(errors).length > 0) {
      alert('Please fill in all the required fields')
    } else {
      dispatch(signUp(input, router))
    }
  }

  console.log(input)
  return (
    <MobileLayout>
      <div className={'md:shadow-2xl bg-[#F7F8FA] h-fit flex items-center flex-col'}>
        <Nav location={'Ride'}/>
        <div className={'h-1/2 flex justify-center'}>
          <Image width={'274px'} height={'287px'} src={SignUp} alt="hero" className={'w-3/4'}/>
        </div>
        <div className={'bg-white rounded-xl p-5 m-5 w-5/6 h-fit flex flex-col items-center justify-center shadow-lg'}>
          <div className={'m-2 w-full h-fit flex flex-col items-center justify-center'}>
            <h2 className={'font-bold text-2xl'}>Lets create a Ride</h2>
            <h2>Please complete all the fields</h2>
          </div>

          <div className={'w-full m-2'}>
            <input placeholder={'Name'}
                   className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                   onChange={(e) => handleInputChange(e)}
                   name={'Name1'}
                   value={input.Name1}
            />
          </div>
          <div className={'w-full m-2'}>
            <input placeholder={'Origin'}
                   className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                   onChange={(e) => handleInputChange(e)}
                   name={'Origin'}
                   value={input.Origin}
            />
          </div>
          <div className={'w-full m-2'}>
            <input placeholder={'Destination'}
                   className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                   onChange={(e) => handleInputChange(e)}
                   name={'Destination'}
                   value={input.Destination}
            />
          </div>
          <div className={'w-full m-2'}>
            <input placeholder={'Passengers'}
                   className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                   onChange={(e) => handleInputChange(e)}
                   name={'Passengers'}
                   type={'number'}
                   value={input.Passengers}
            />
          </div>
          <div className={'w-full m-2'}>
            <input placeholder={'ID Number'}
                   className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                   onChange={(e) => handleInputChange(e)}
                   name={'idNumber'}
                   type={'number'}
                   value={input.idNumber}
            />
          </div>
          <div className={'w-full m-2'}>
            <button className={'w-full rounded-[25px] h-[50px] text-white bg-[#5B211F]'}
                    onClick={(e) => handleSubmit(e)}>Create Ride
            </button>
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}
