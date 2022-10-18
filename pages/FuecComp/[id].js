import React, { useEffect, useState } from 'react'
import FuecTemplate from '../../components/FuecTemplate/FuecTemplate'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { useRouter } from 'next/router'

export default function FuecComp ({ data }) {
  const router = useRouter()
  const { id } = router.query
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
  }, [id])

  return (
    <div className={'bg-[#f7f8fa] h-screen w-full flex items-center justify-center'}>
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
