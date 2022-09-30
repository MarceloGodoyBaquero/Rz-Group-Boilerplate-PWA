import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function ClientTravelsCard ({ estado, id, data }) {
  const router = useRouter()
  console.log(data)
  return (
    <div onClick={() => router.push(`/client/travels/${id}`)}
         className={'bg-white m-2 flex-row flex h-[100px] items-center  w-5/6 rounded'}>
      <div className={'indent-3 flex flex-col justify-center'}>
        <h1>Origen: {data?.from}</h1>
        <h1>Destino: {data?.to}</h1>
        <h1>Inicio: {data?.start_date?.slice(0, 10)}</h1>
        <h1>Final: {data?.end_date?.slice(0, 10)}</h1>
      </div>
    </div>
  )
}
