import React from 'react'
import MobileLayout from '../components/MobileLayout'
import Nav from '../components/Nav'
import Image from 'next/image'
import LoginImage from '../public/Login.svg'
import OtpInput from 'react-otp-input'

const Verification = () => {
  const [otp, setOtp] = React.useState('')
  const handleChange = (otp) => {
    setOtp(otp)
    return console.log(otp)
  }
  return (
    <MobileLayout>
      <div className={'md:shadow-2xl bg-[#F7F8FA] h-screen flex items-center flex-col'}>
        <Nav location={'Account Verification'}/>
        <Image width={'274px'} height={'287px'} src={LoginImage} alt="hero" className={'w-3/4'}/>
        <div className={'bg-white rounded-xl p-5 m-5 w-5/6 h-fit flex flex-col items-center justify-center shadow-lg'}>
          <div className={'m-2 w-full h-fit flex flex-col items-center justify-center'}>
            <h2 className={'font-bold text-2xl'}>OTP Verification</h2>
            <h2>An authentication code has been sent to
              your mail</h2>
          </div>
          <div className={'w-full'}>
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
            <h2>I didnt receive code. <span className={'text-blue-500 cursor-pointer'}>Resend Code</span></h2>
          </div>
          <div className={'w-full m-2'}>
            <button className={'w-full rounded-[25px] h-[50px] text-white bg-[#3A56FF]'}>VERIFY NOW</button>
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}

export default Verification
