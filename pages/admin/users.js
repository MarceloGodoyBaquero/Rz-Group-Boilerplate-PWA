import React from 'react'
import Nav from '../../components/Nav'
import { useRouter } from 'next/router'
import MobileLayout from '../../components/MobileLayout'
import ReactPaginate from 'react-paginate'
// import axios from 'axios'

export default function users ({ data }) {
  const router = useRouter()

  const handlePagination = (page) => {
    router.push(`/admin/users?page=${page.selected + 1}`)
  }

  return (
    <MobileLayout>
      <div className={'md:shadow-2xl bg-[#F7F8FA] h-screen flex items-center flex-col'}>
        <Nav location={'Usuarios'}/>
        <div className={'flex flex-col justify-center w-full'}>
          <div className={'flex justify-center w-full items-center'}>
            <input
              className={'m-5 text-center h-10 w-full rounded-full border-2 border-blue-500'}
              type={'search'}
              placeholder={'Buscar usuario por ID'}
            />
          </div>
          <div className={'mt-1 mb-1 flex w-full flex-row items-center justify-center'}>
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
          {
            data.data.map((user, index) => {
              return (
                <div
                  onClick={() => router.push(`/admin/users/${user._id}`)}
                  key={index} className={'m-5 bg-white flex flex-col justify-center items-center'}>
                  <h1 className={''}>Nombre: {user.firstName}</h1>
                  <h1 className={''}>Apellido: {user.lastName}</h1>
                  <h1 className={''}>ID: {user.idNumber}</h1>
                </div>
              )
            })
          }
          <div className={'flex w-full flex-row items-center justify-center'}>
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
  const res = await fetch(`https://rz-group-backend.herokuapp.com/api/user?skip=${context.query.page - 1}&limit=10`)
  const data = await res.json()
  return {
    props: {
      data
    }
  }
}
