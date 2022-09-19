import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import FuecTemplate from '../components/FuecTemplate/FuecTemplate'
import { PDFViewer } from '@react-pdf/renderer'
export default function Fuec () {
  const { user } = useSelector(state => state)
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <div className='flex content-center items-center justify-center w-[100%] h-[100vh]' >
      {
        mounted && <PDFViewer style={{ width: '100%', height: '100vh' }} suppressHydrationWarning={true}>
          <FuecTemplate name={user.name}/>
        </PDFViewer>
      }
    </div>
  )
}
