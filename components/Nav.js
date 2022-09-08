import React, { useEffect, useState } from 'react'
import { ArrowDownOnSquareIcon, ArrowLeftIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

export default function Nav ({ location }) {
  const [supportsPWA, setSupportsPWA] = useState(false)
  const [promptInstall, setPromptInstall] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const handler = e => {
      e.preventDefault()
      console.log('we are being triggered :D')
      setSupportsPWA(true)
      setPromptInstall(e)
    }
    window.addEventListener('beforeinstallprompt', handler)

    return () => window.removeEventListener('transitionend', handler)
  }, [])

  const install = (e) => {
    e.preventDefault()
    if (!promptInstall) {
      return
    }
    promptInstall.prompt()
  }

  return (
    <nav className={'bg-white w-full h-13 flex justify-center flex-row shadow-lg mb-3'}>
      <div onClick={() => router.back()} className={'w-1/6 flex items-center justify-center cursor-pointer'}>
        <ArrowLeftIcon className={'h-1/3'}/>
      </div>
      <div className={'w-4/6 flex items-center justify-center'}>
        <h2 className={'font-bold text-2xl'}>{location}</h2>
      </div>
      <div className={'w-1/6 flex items-center justify-center'}>
        {supportsPWA && <ArrowDownOnSquareIcon className={'h-1/3 cursor-pointer'} onClick={(e) => install(e)}/>}
      </div>
    </nav>
  )
}

Nav.propTypes = {
  location: PropTypes.string
}
