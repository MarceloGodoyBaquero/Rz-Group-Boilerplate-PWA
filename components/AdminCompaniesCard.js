import React from 'react'
import PropTypes from 'prop-types'

export default function AdminCompaniesCard ({ type, name, lastName, id, phone, idNumber, address }) {
  AdminCompaniesCard.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    lastName: PropTypes.string,
    id: PropTypes.string,
    phone: PropTypes.string,
    idNumber: PropTypes.string,
    address: PropTypes.string
  }
  return (
    <div className={'bg-white m-2 flex-row flex justify-evenly h-[200px] items-center w-full rounded-2xl'}>
      <div className={`flex items-center justify-center w-[100px] h-[100px] mr-5 ${type === 'Persona juridica' || type === 'Persona jurídica' ? 'border-green-500 border-4' : 'border-red-500 border-4'} rounded-full`}>
        <h2 className={'font-bold text-black text-center' }>
          {type}
        </h2>
      </div>
      <div className='flex flex-col justify-evenly items-flex-start h-fit'>
        <div>
        <h1 className={''}>
            Nombre: <span className='font-bold'>
              {/* if the name is long slice it */}
              {type === 'Persona juridica' || type === 'Persona jurídica'
                ? name.length > 15
                  ? name.slice(0, 15) + '...'
                  : name
                : `${name} ${lastName}`}
            </span>
          </h1></div>
          <div>
        <h1 className='font-bold'>
          CODIGO: <span className={'font-bold text-red-500'}>{id}</span>
        </h1></div>
        <div>
        <h1 className={''}>
          Teléfono: <span className={'font-bold text-green-500'}>{phone}</span>
        </h1></div>
        <div>
        <h1 className={'font-bold'}>
          NIT/CC: <span className={'font-bold text-green-500'}>
            {idNumber}
          </span>
        </h1></div>
        <div>
        <h1 className={''}>
          Dirección: <span className={'font-bold text-green-500'}>
            {address}
          </span>
        </h1></div>
      </div>
    </div>
  )
}
