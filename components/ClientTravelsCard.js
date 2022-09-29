import React from "react";
import {useRouter} from "next/router";

export default function ClientTravelsCard ({ estado, id }) {
  const router = useRouter()
  return (
    <div onClick={() => router.push(`/client/travels/${id}`)} className={'bg-white m-2 flex-row flex h-[50px] items-center w-5/6 rounded'}>
      <div className={'flex items-center justify-center'}>
        {estado === 'En marcha' && <h2>Viaje en marcha</h2>}
        {estado === 'Pendiente' && <h2>Viaje pendiente</h2>}
        {estado === 'Finalizado' && <h2>Viaje finalizado</h2>}
      </div>
    </div>
  )
}