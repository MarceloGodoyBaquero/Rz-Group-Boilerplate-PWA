import React, { useEffect, useState } from 'react'
import { ArrowDownOnSquareIcon, ArrowLeftIcon, Bars2Icon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import Image from 'next/image'
import EditIcon from '../public/Images/EditProfile.svg'
import Menu from './Menu'

export default function Nav ({ location, cosito, goBack }) {
  const [supportsPWA, setSupportsPWA] = useState(false)
  const [promptInstall, setPromptInstall] = useState(null)
  const router = useRouter()
  const [open, setOpen] = useState(false)

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

  const showSidebar = () => {
    setOpen(!open)
  }

  return (
    <nav className={'bg-white w-full h-13 flex justify-center flex-row shadow-lg mb-3'}>
      {location === 'Home' &&
      <div className={'w-1/6 flex items-center justify-center cursor-pointer'} onClick={() => showSidebar()}>
        <Bars2Icon className={'h-1/3'} />
      </div>}
      {location === 'Home' && open
        ? <Menu closeFunc={setOpen}>
        </Menu>
        : null
      }
       {location !== 'Home' && <div onClick={() => goBack ? router.push(goBack) : router.back()} className={'w-1/6 flex items-center justify-center cursor-pointer'}>
        <ArrowLeftIcon className={'h-1/3'}/>
       </div>}
      <div className={'w-4/6 flex items-center justify-center'}>
        <h2 className={'font-bold text-2xl'}>{location}</h2>
      </div>
      <div className={'w-1/6 flex items-center justify-center'}>
        {supportsPWA && <ArrowDownOnSquareIcon className={'h-1/3 cursor-pointer'} onClick={(e) => install(e)}/>}
        {cosito && <Image src={EditIcon} width={30} height={30} className={'h-1/3 cursor-pointer'} onClick={() => router.push('/EditProfile')}/>}
      </div>
    </nav>
  )
}

Nav.propTypes = {
  location: PropTypes.string,
  cosito: PropTypes.bool,
  goBack: PropTypes.string
}
