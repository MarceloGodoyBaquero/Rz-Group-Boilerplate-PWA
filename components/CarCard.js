import React from 'react'
import { useRouter } from 'next/router'
import { TruckIcon } from '@heroicons/react/24/outline'
import PropTypes from 'prop-types'

export default function CarCard ({ id, brand, model, year, plate, aprobado }) {
  const router = useRouter()
  console.log(aprobado)
  return (
    <div onClick={() => router.push(`/driver/vehicles/${id}`)} className={'mt-5 flex-row flex items-center bg-white w-5/6 rounded'}>
      <div className={'flex items-center justify-center'}>
        <div className={'w-[80px] h-[80px] rounded'}>
          <TruckIcon className={aprobado === 'aproved' ? 'bg-green-500' : aprobado === 'inReview' ? 'bg-yellow-500' : 'bg-red-500'}/>
        </div>
      </div>
      <div className={'flex'}>
        <div className={'flex flex-col'}>
          <h3>Marca: {brand}</h3>
          <h3>Modelo: {model}</h3>
        </div>
        <div className={''}>
          <h3>Año: {year}</h3>
          <h3>Matricula: {plate}</h3>
        </div>
      </div>
    </div>
  )
}

CarCard.propTypes = {
  id: PropTypes.string,
  brand: PropTypes.string,
  model: PropTypes.string,
  year: PropTypes.string,
  plate: PropTypes.string,
  aprobado: PropTypes.bool
}
