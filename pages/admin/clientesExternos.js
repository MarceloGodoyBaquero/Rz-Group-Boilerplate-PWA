import React from 'react'
import MobileLayout from '../../components/MobileLayout'
import Nav from '../../components/Nav'
import ReactPaginate from 'react-paginate'
import { useRouter } from 'next/router'
import { IoCarSportSharp } from 'react-icons/io5'

export default function clientesExternos ({ data }) {
  const router = useRouter()
  console.log(data)
  const handlePagination = (page) => {
    router.push(`/admin/clientesExternos?page=${page.selected + 1}`)
  }

  return (
    <MobileLayout>
      <div className={'md:shadow-2xl bg-[#F7F8FA] h-fit flex items-center flex-col'}>
        <Nav location={'Clientes Externos'} goBack={'/admin'}/>
        <div className={'flex flex-col justify-center w-full'}>
          {
            data?.data?.map((client, index) => {
              return (
                <div key={index}
                     className={index % 2 === 0 ? 'rounded-2xl ml-5 mr-5 mt-5 mb-2 pl-0 bg-white flex flex-col justify-evenly items-center drop-shadow-2xl' : 'rounded-2xl ml-5 mr-5 mt-5 mb-2 bg-gray-100 flex flex-col justify-evenly items-center drop-shadow-2xl'}>
                  <div className={'font-bold flex flex-row items-center justify-evenly w-full mb-2 mt-2'}>
                    <h1>Nombre: {client?.name}</h1>
                    <h1>{client?.id_type}: {client?.id_number}</h1>
                  </div>
                  <div className={'w-full indent-5'}>
                    <h1>Tel: {client?.phone}</h1>
                    <h1>Dir: {client?.address}</h1>
                    <h1>Email: {client?.email}</h1>
                    <hr className={'mt-2 mb-2'}/>
                    <h1>Dir responsable: {client?.responsible_name ? client?.responsible_name : 'N/A'}</h1>
                    <h1>CC responsable: {client?.responsible_id ? client?.responsible_id : 'N/A'}</h1>
                    <h1>Tel responsable: {client?.responsible_phone ? client?.responsible_phone : 'N/A'}</h1>
                  </div>
                </div>
              )
            })
          }
          <div className={'mt-5 mb-5 flex w-full flex-row items-center justify-center'}>
            <ReactPaginate
              className={'flex w-full flex-row items-center justify-evenly'}
              breakLabel={'...'}
              nextLabel={'siguiente'}
              previousLabel={'anterior'}
              // currentPage={data.currentPage + 1 }
              initialPage={0}
              pageRangeDisplayed={3}
              pageCount={data.maxPage}
              onPageChange={handlePagination}
              activeClassName={'bg-blue-500 flex items-center justify-center font-bold text-white h-7 w-7 rounded-full'}
              nextLinkClassName={'text-blue-500 border-2 border-blue-500 rounded-full p-2'}
              previousLinkClassName={'text-blue-500 border-2 border-blue-500 rounded-full p-2'}
            />
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}

// <div
//   onClick={() => router.push(`/admin/vehicles/${vehicle._id}`)}
//   key={index}
//   className={index % 2 === 0 ? 'rounded-2xl ml-5 mr-5 mt-5 mb-2 pl-0 bg-white flex flex-row justify-center items-center drop-shadow-2xl' : 'rounded-2xl ml-5 mr-5 mt-5 mb-2 bg-gray-100 flex flex-row justify-center items-center drop-shadow-2xl'}>
//   <div className={vehicle.isAproved === 'aproved'
//     ? 'bg-green-300 border-4 border-green-500 w-[100px] h-[100px] m-0 h-full rounded-full p-0 flex flex-col items-center justify-center'
//     : vehicle.isAproved === 'inReview'
//       ? 'bg-orange-300 border-4 border-orange-500 w-[100px] h-[100px] rounded-xl m-0 p-0 flex flex-col items-center justify-center'
//       : 'text-center bg-red-300 border-4 border-red-500 w-[100px] h-[100px] rounded-xl m-0 p-0 flex flex-col items-center justify-center'}>
//     <IoCarSportSharp className={'h-10 w-10 text-white'}/>
//     {vehicle.isAproved === 'aproved'
//       ? <h3>Aprobado</h3>
//       : vehicle.isAproved === 'inReview'
//         ? <h3>Pendiente</h3>
//         : <h3>No aprobado</h3>}
//   </div>
//   <div className={'w-3/4 flex flex-col items-center justify-center'}>
//     <h1
//       className={'mt-2 cursor-pointer bg-gradient-to-l from-gray-300 font-bold text-center w-full bg- h-[30px] rounded-r-xl'}>Dueño: {`${owner?.firstName} ${owner?.lastName}`}</h1>
//     <ul>
//       <li className={''}>Marca: {vehicle.brand}</li>
//       <li className={''}>Modelo: {vehicle.model}</li>
//       <li className={''}>Matricula: {vehicle.carPlate}</li>
//       <li className={''}>Categoría: {vehicle.category}</li>
//       <li className={''}>Fecha de subida: {vehicle?.createdAt?.slice(0, 10)}</li>
//     </ul>
//   </div>
// </div>

export async function getServerSideProps (context) {
  const res = await fetch(`https://rz-group-backend.herokuapp.com/api/extclient/?skip=${context.query.page - 1}&limit=10`)
  const data = await res.json()
  console.log(data)
  return {
    props: {
      data
    }
  }
}
