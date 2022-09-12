import React from 'react'
import dynamic from 'next/dynamic'
import FuecTemplate from '../components/FuecTemplate/FuecTemplate'
const PDFDownloadLink = dynamic(() => import('@react-pdf/renderer'), {
  ssr: false
})
export default function Fuec () {
  return (
    <div className='flex content-center items-center justify-center w-[100%] h-[100vh]' suppressHydrationWarning={true}>
      {
        process.browser && <PDFDownloadLink document={<FuecTemplate />} fileName="myPdf">
          <button>Download</button>
        </PDFDownloadLink>
      }
    </div>
  )
}
