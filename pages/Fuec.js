import React, { useEffect, useState } from 'react'
import FuecTemplate from '../components/FuecTemplate/FuecTemplate'
import { PDFViewer } from '@react-pdf/renderer'
export default function Fuec () {
  //
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <div className='flex content-center items-center justify-center w-[100%] h-[100vh]' >
      {
        mounted && <PDFViewer style={{ width: '100%', height: '100vh' }} suppressHydrationWarning={true}>
          <FuecTemplate />
        </PDFViewer>
      }
    </div>
  )
}
