/* eslint react/prop-types: 0 */
import React, { useEffect, useState } from 'react'
import FuecTemplate from '../../components/FuecTemplate/FuecTemplate'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { useRouter } from 'next/router'
import { QRCodeCanvas } from 'qrcode.react'

export default function FuecComp ({ data }) {
  const router = useRouter()
  const { id } = router.query
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    console.log(data)
  }, [id])

  return (
    <div className={'bg-[#f7f8fa] h-screen w-full flex items-center justify-center'}>
      <div className={'h-screen w-full flex flex-col items-center justify-center'}>
        <div className={'m-5 w-3/5 p-5 bg-white rounded-2xl'}>
          <h2>Conductor: {data.driver[0].firstName} {data.driver[0].lastName}</h2>
          <h2>CC: {data.driver[0].idNumber}</h2>
          <h2>Licencia: {data.driver[0].nro_license}</h2>
        </div>
        <QRCodeCanvas
          id={'QR-generado'}
          includeMargin={true}
          fgColor={'#5b211f'}
          size={200}
          value={`http://localhost:3000/FuecComp/${id}`}/>
          {loading && (
            <PDFDownloadLink document={<FuecTemplate name={data.driver[0].firstName + ' ' + data.driver[0].lastName}
                                                     service={data}/>} fileName='fuec.pdf'
                             className='w-full flex justify-center items-center'>
              <button
                className={'mb-1 bg-[#5B211F] w-5/6 rounded-full mt-5 h-[50px] text-white font-bold'}>DESCARGAR
                COMPROBANTE DE FUEC
              </button>
            </PDFDownloadLink>)}
      </div>
    </div>
  )
}

export async function getServerSideProps (context) {
  const res = await fetch(`https://rz-group-backend.herokuapp.com/api/services/${context.query.id}`)
  const data = await res.json()
  console.log(data)
  return {
    props: {
      data
    }
  }
}
