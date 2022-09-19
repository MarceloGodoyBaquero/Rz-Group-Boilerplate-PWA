import React from 'react'
import Nav from '../../components/Nav'
import { useRouter } from 'next/router'
import MobileLayout from '../../components/MobileLayout'
import ReactPaginate from 'react-paginate'
import { UserIcon } from '@heroicons/react/24/solid'
// import axios from 'axios'

export default function users ({ data }) {
  const router = useRouter()

  const handlePagination = (page) => {
    router.push(`/admin/users?page=${page.selected + 1}`)
  }

  return (
    <MobileLayout>
      <div className={'md:shadow-2xl bg-[#F7F8FA] h-fit flex items-center flex-col'}>
        <Nav location={'Usuarios'}/>
        <div className={'flex flex-col justify-center w-full'}>
          <div className={'flex justify-center w-full items-center'}>
            <input
              className={'m-5 text-center h-10 w-full rounded-full border-2 border-blue-500'}
              type={'search'}
              placeholder={'Buscar usuario por ID'}
            />
          </div>
          {
            data.data.map((user, index) => {
              return (
                <div
                  onClick={() => router.push(`/admin/users/${user._id}`)}
                  key={index} className={index % 2 === 0 ? 'ml-5 mr-5 mt-2 mb-2 bg-white flex flex-row justify-center items-center' : 'ml-5 mr-5 mt-2 mb-2 bg-gray-100 flex flex-row justify-center items-center'}>
                  <div className={user.isAproved === 'aproved'
                    ? 'h-[80px] bg-green-300 w-1/4 h-max m-0 p-0 flex flex-col items-center justify-center'
                    : user.isAproved === 'inReview'
                      ? 'h-[80px] bg-orange-300 w-1/4 h-max m-0 p-0 flex flex-col items-center justify-center'
                      : 'h-[80px] bg-red-300 w-1/4 h-max m-0 p-0 flex flex-col items-center justify-center'}>
                    <UserIcon className={'h-10 w-10 text-white'}/>
                    {user.isAproved === 'aproved' ? <h3>Aprobado</h3> : user.isAproved === 'inReview' ? <h3>Pendiente</h3> : <h3>No aprobado</h3>}
                  </div>
                  <div className={'w-3/4 flex flex-col items-center justify-center'}>
                  <h1 className={''}>Nombre: {user.firstName}</h1>
                  <h1 className={''}>Apellido: {user.lastName}</h1>
                  <h1 className={''}>ID: {user.idNumber}</h1>
                  </div>
                </div>
              )
            })
          }
          <div className={'mt-1 mb-5 mt-5 flex w-full flex-row items-center justify-center'}>
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
  console.log(data)
  return {
    props: {
      data
    }
  }
}
