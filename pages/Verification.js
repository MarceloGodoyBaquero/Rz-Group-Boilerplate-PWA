import React, { useEffect } from 'react'
import MobileLayout from '../components/MobileLayout'
import Nav from '../components/Nav'
import Image from 'next/image'
import Otp from '../public/Images/Otp.svg'
import OtpInput from 'react-otp-input'
import { verifyEmail, sendOTP } from '../Redux/Actions/authActions'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

const Verification = () => {
  const [otp, setOtp] = React.useState('')
  const dispatch = useDispatch()
  const router = useRouter()
  const user = useSelector(state => state.user)

  useEffect(() => {
    console.log(user.email)
    dispatch(sendOTP({ email: user.email }))
  }, [])

  const handleChange = (otp) => {
    return setOtp(otp)
  }
  const handlesendOTP = () => {
    dispatch(sendOTP({ email: user.email }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(verifyEmail({ email: user.email, code: otp }, router))
  }
  return (
    <MobileLayout>
      <div className={'md:shadow-2xl bg-[#F7F8FA] h-screen flex items-center flex-col'}>
        <Nav location={'Verificar cuenta'}/>
        <Image width={'274px'} height={'287px'} src={Otp} alt="hero" className={'w-3/4'}/>
        <div className={'bg-white rounded-xl p-5 m-5 w-5/6 h-fit flex flex-col items-center justify-center shadow-lg'}>
          <div className={'m-2 w-full h-fit flex flex-col items-center justify-center'}>
            <h2 className={'font-bold text-2xl'}>Verificación OTP</h2>
            <h2>Se ha enviado un código de autenticación a su correo</h2>
          </div>
          <div className={'w-full flex justify-center'}>
            <OtpInput
              value={otp}
              onChange={handleChange}
              numInputs={4}
              isInputNum={true}
              containerStyle={'w-[400px] border-2 border-[#F7F8FA] rounded-xl h-[100px] flex flex-row items-center justify-evenly'}
              inputStyle={{ backgroundColor: '#F7F8FA', width: '50px', height: '50px', borderRadius: '10px', border: 'none', fontSize: '20px', textAlign: 'center' }}
            />
          </div>
          <div className={'m-2 w-full h-fit flex flex-col items-center justify-center'}>
            <h2>No recibiste el código? <span className={'text-[#5B211F] cursor-pointer font-bold'} onClick={() => handlesendOTP()}>Reenviar Código</span></h2>
          </div>
          <div className={'w-full m-2'}>
            <button className={'w-full rounded-[25px] h-[50px] text-white bg-[#5B211F]'} onClick={(e) => handleSubmit(e)}>VERIFICAR</button>

          </div>
        </div>
      </div>
    </MobileLayout>
  )
}

export default Verification
