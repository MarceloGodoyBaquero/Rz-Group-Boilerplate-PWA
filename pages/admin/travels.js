import React from 'react'
import Nav from '../../components/Nav'
import MobileLayout from '../../components/MobileLayout'
/* import axios from 'axios' */
import ReactPaginate from 'react-paginate'
import { useRouter } from 'next/router'

export default function travels ({ data }) {
  const router = useRouter()
  console.log(data)
  /* const fetcheo = async (e, id) => {
    e.preventDefault()
    console.log(id)
    axios.get(`https://rz-group-backend.herokuapp.com/api/services/${id}`)
      .then(r => {
        console.log(r)
      })
  } */

  const handlePagination = (page) => {
    router.push(`/admin/travels?page=${page.selected + 1}`)
  }

  return (
    <MobileLayout>
      <div className={'md:shadow-2xl bg-[#F7F8FA] h-fit h-screen flex items-center flex-col'}>
        <Nav location={'Viajes'}/>
        <div className={'flex flex-col justify-center w-full'}>
          <div className={'flex justify-center w-full items-center'}>
            <input
              className={'m-5 text-center h-[70px] w-full rounded-full border-2 border-blue-500'}
              type={'search'}
              placeholder={'Buscar vehiculo por MATRICULA'}
            />
          </div>
          {
            data.data.map((travels, index) => {
              return (
                <div onClick={(e) => router.push(`/admin/travels/${travels._id}`)}
                     key={index} className={
                      travels?.status === 'pending'
                        ? 'm-5 bg-orange-300 flex flex-col justify-center items-center'
                        : travels?.status === 'on progress'
                          ? 'm-5 bg-green-300 flex flex-col justify-center items-center'
                          : 'm-5 bg-red-300 flex flex-col justify-center items-center'
                      }>
                  <h1 className={'font-bold text-2xl'}>{travels?.status}</h1>
                  <h1 className={''}>Estado: {travels?.status === 'pending' ? 'Pendiente' : travels?.status === 'on progress' ? 'En progreso' : 'Cancelado' }</h1>
                  <h1 className={''}>Categoría: {travels?.category}</h1>
                  <h1 className={''}>Fecha: {travels?.date?.slice(0, 10)}</h1>
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
