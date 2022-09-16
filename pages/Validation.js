import React from 'react'

export default function Validation () {
  return (
    <div className={'md:shadow-2xl bg-[#F7F8FA] h-screen flex items-center flex-col justify-center'}>
      <div className={'flex flex-col justify-center w-full h-full bg-red-500 '}>
        <div className='flex justify-start items-center '>
          <h1>
            Para completar tu registro, necesitamos validar algunos datos.
          </h1>
        </div>
      </div>
    </div>
  )
}
