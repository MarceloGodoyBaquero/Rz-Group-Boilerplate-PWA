import React from 'react'
import Nav from '../../components/Nav'
import MobileLayout from '../../components/MobileLayout'
/* import axios from 'axios' */
import ReactPaginate from 'react-paginate'
import { useRouter } from 'next/router'

export default function travels ({ data }) {
  const router = useRouter()
  console.log(data)

  const handlePagination = (page) => {
    router.push(`/admin/travels?page=${page.selected + 1}`)
  }

  console.log(data)

  return (
    <MobileLayout>
      <div className={'md:shadow-2xl bg-[#F7F8FA] h-fit flex items-center flex-col'}>
        <Nav location={'Viajes'} goBack={'/admin'}/>
        <div className={'flex flex-col justify-center w-full'}>
          <div className={'flex justify-center w-full items-center'}>
          </div>
          {
            data.data.map((travels, index) => {
              return (
                <div onClick={(e) => router.push(`/admin/travels/${travels._id}`)}
                     key={index} className={'m-5 rounded-2xl bg-white flex flex-row justify-evenly items-center'}>
                  <div className={'w-1/3'}>
                    <div className={travels?.status === 'completed' ? 'flex border-4 border-green-500 items-center justify-center h-[110px] w-[110px] rounded-full' : travels?.status === 'on progress' ? 'flex border-4 border-yellow-500 items-center justify-center h-[110px] w-[110px] rounded-full' : 'flex border-4 border-orange-500 items-center justify-center h-[110px] w-[110px] rounded-full'}>
                      <h3
                        className={'font-bold'}>{travels?.status === 'on progress' ? 'En progreso' : travels?.status === 'pending' ? 'Pendiente' : 'Completado'}</h3>
                    </div>
                  </div>
                  <div className={'w-2/3'}>
                    <h1 className={'font-bold'}>Cliente: {travels?.client?.firstName} {travels?.client?.lastName}</h1>
                    <h1 className={'font-bold'}>{travels?.client?.companyAllied?.name ? travels?.client?.companyAllied?.name : 'N / A'}</h1>
                    <h1 className={travels?.driver[0]?.firstName?.length ? 'font-bold text-green-500' : 'font-bold text-amber-500'}>Conductor: {travels?.driver[0]?.firstName ? travels?.driver[0]?.firstName : 'sin conductor asignado'}</h1>
                    <h1 className={''}>Categoría: {travels?.category}</h1>
                    <h1 className={''}>Ruta: {travels?.from} - {travels?.to}</h1>
                    <h1 className={''}>
                      Fecha: {travels?.start_date?.slice(0, 10)} / {travels?.end_date?.slice(0, 10)}
                    </h1>
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

export async function getServerSideProps (context) {
  const res = await fetch(`https://rz-group-backend.herokuapp.com/api/admin/services?skip=${context.query.page - 1}&limit=10`)
  const data = await res.json()
  console.log(data)
  return {
    props: {
      data
    }
  }
}
