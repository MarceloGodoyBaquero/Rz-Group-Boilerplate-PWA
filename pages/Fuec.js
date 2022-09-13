import React from 'react'
import FuecTemplate from '../components/FuecTemplate/FuecTemplate'
import { PDFDownloadLink } from '@react-pdf/renderer'
export default function Fuec () {
  return (
    <div className='flex content-center items-center justify-center w-[100%] h-[100vh]' suppressHydrationWarning={true}>
      {
        process.browser && <PDFDownloadLink document={<FuecTemplate />} fileName="myPdf">
          { ({ blob, url, loading, error }) => loading ? 'Loading document...' : 'Download now!' }
        </PDFDownloadLink>
      }
    </div>
  )
}
