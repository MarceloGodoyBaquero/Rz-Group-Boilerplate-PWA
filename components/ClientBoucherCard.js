import React from "react";
import {useRouter} from "next/router";

export default function ClientBoucherCard ({ estado, id }) {
  const router = useRouter()
  return (
    <div onClick={() => router.push(`/client/bouchers/${id}`)} className={'bg-white m-2 flex-row flex h-[50px] items-center w-5/6 rounded'}>
      <div className={'flex items-center justify-center w-full'}>
        {estado === 'Pendiente' && <h2>Pago pendiente</h2>}
        {estado === 'Finalizado' && <h2>Pago finalizado</h2>}
      </div>
    </div>
  )
}