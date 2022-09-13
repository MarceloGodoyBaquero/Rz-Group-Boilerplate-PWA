import React from 'react'
import FuecTemplate from '../components/FuecTemplate/FuecTemplate'
import { PDFViewer } from '@react-pdf/renderer'
export default function Fuec () {
  return (
    <div className='flex content-center items-center justify-center w-[100%] h-[100vh]' >
      {
        process.browser && <PDFViewer style={{ width: '100%', height: '100vh' }} suppressHydrationWarning={true}>
          <FuecTemplate />
        </PDFViewer>
      }
    </div>
  )
}
