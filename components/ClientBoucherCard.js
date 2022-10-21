import React from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

export default function ClientBoucherCard ({ rol, estado, id, paymentAmount, paymentType, startDate, driver }) {
  const router = useRouter()
  return (
    <div onClick={() => router.push(`/${rol}/bouchers/${id}`)} className={'bg-white m-2 flex-row flex justify-evenly h-[100px] items-center w-full rounded'}>
      <div className={`flex items-center justify-center w-[100px] h-[100px] ${paymentType === 'voucher' ? 'border-green-500 border-4' : 'border-red-500 border-4'} rounded-full`}>
        <h2 className={'font-bold text-black' }>
          {paymentType === 'cash' ? 'Efectivo' : 'Voucher'}
        </h2>
      </div>
      <div className='flex flex-col justify-center items-flex-start'>
        <h1 className={'font-bold'}>
          Estado: <span className={`${estado ? 'text-green-500' : 'text-red-500'}`}>{estado ? 'Pagado' : 'Pendiente'}</span>
        </h1>
        <h1 className={'font-bold'}>
          Monto: <span className={'font-bold text-green-500'}>$ {paymentAmount}</span>
        </h1>
        {
          rol === 'driver'
            ? <h1 className={'font-bold'}>
            Cliente: <span className='font-bold'>
              {driver?.firstName} {driver?.lastName}
            </span>
          </h1>
            : <h1>
          Conductor: <span className={'font-bold'}>{driver.firstName + ' ' + driver.lastName}</span>
        </h1>
        }
        <h1>
          Fecha: <span className={'font-bold'}>{startDate.split('T')[0]}</span>
        </h1>
      </div>
    </div>
  )
}

ClientBoucherCard.propTypes = {
  estado: PropTypes.boolean,
  id: PropTypes.string,
  paymentAmount: PropTypes.string,
  paymentType: PropTypes.string,
  startDate: PropTypes.string,
  driver: PropTypes.object,
  rol: PropTypes.string
}
