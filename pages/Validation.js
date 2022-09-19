import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import validationHero from '../public/Images/OnBoarding-3.svg'
import Image from 'next/image'

const Nav = dynamic(() => import('../components/Nav'), { ssr: false })

export default function Validation () {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <div className={'md:shadow-2xl bg-[#F7F8FA] h-screen flex items-center flex-col'}>
      <Nav location={'Validación Conductor'}/>
      {mounted &&
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
            <div>
            </div>
          </div>
        </div>
      }</div>
  )
}
