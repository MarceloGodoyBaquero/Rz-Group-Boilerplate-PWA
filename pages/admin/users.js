import React, { useEffect } from 'react'
import Nav from '../../components/Nav'
import { useRouter } from 'next/router'
import MobileLayout from '../../components/MobileLayout'
import ReactPaginate from 'react-paginate'
import { UserIcon } from '@heroicons/react/24/solid'
// import axios from 'axios'

export default function users ({ data }) {
  const router = useRouter()
  const [search, setSearch] = React.useState('')
  const [searchData, setSearchData] = React.useState([])
  useEffect(() => {
    search.length >= 4 && fetch('https://rz-group-backend.herokuapp.com/api/admin/user/search?fullName=' + search)
      .then(res => res.json())
      .then(data => {
        setSearchData(data)
      })
    if (search.length < 5) {
      setSearchData([])
    }
  }, [search])
  console.log(searchData)
  const handlePagination = (page) => {
    router.push(`/admin/users?page=${page.selected + 1}`)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  return (
    <MobileLayout>
      <div className={'md:shadow-2xl bg-[#F7F8FA] h-fit flex items-center flex-col'}>
        <Nav location={'Usuarios'} goBack={'/admin'}/>
        <div className={'flex flex-col justify-center w-full'}>
          <div className={'flex justify-center w-full items-center'}>
            <input
              className={'m-5 text-center h-10 w-full rounded-full border-2 border-blue-500'}
              type={'search'}
              placeholder={'Buscar usuario por Nombre y Apellido'}
              value={search}
              onChange={(e) => handleSearch(e)}
            />
          </div>
          {searchData.length > 0
            ? searchData?.map((user, index) => {
              return (
                <div
                  onClick={() => router.push(`/admin/users/${user._id}`)}
                  key={index}
                  className={index % 2 === 0 ? 'rounded-2xl ml-5 mr-5 mt-5 mb-2 pl-0 bg-white flex flex-row justify-center items-center drop-shadow-2xl' : 'rounded-2xl ml-5 mr-5 mt-5 mb-2 bg-gray-100 flex flex-row justify-center items-center drop-shadow-2xl'}>
                  {
                    user?.roles[0]?.name?.includes('client')
                      ? <div
                        className={' border-4 border-green-500 w-[100px] h-[100px] m-0 h-full rounded-full p-0 flex flex-col items-center justify-center'}>
                        <h3 className={'font-bold'}>Cliente</h3>
                      </div>
                      : user.roles[0].name?.includes('admin')
                        ? <div
                          className={' border-4 border-yellow-500 w-[100px] h-[100px] m-0 h-full rounded-full p-0 flex flex-col items-center justify-center'}>
                          <h3 className={'font-bold'}>Admin</h3>
                        </div>
                        : <div
                          style={user.roles[0].name.includes('client') ? { visibility: 'hidden' } : { visibility: 'visible' }}
                          className={user.isAproved === 'aproved'
                            ? 'bg-green-300 border-4 border-green-500 w-[100px] h-[100px] m-0 h-full rounded-full p-0 flex flex-col items-center justify-center'
                            : user.isAproved === 'inReview'
                              ? 'bg-orange-300 border-4 border-orange-500 w-[100px] h-[100px] rounded-xl m-0 p-0 flex flex-col items-center justify-center'
                              : 'text-center bg-red-300 border-4 border-red-500 w-[100px] h-[100px] rounded-xl m-0 p-0 flex flex-col items-center justify-center'}>
                          <UserIcon className={'h-10 w-10 text-white'}/>
                          {user.isAproved === 'aproved'
                            ? <h3>Aprobado</h3>
                            : user.isAproved === 'inReview'
                              ? <h3>Pendiente</h3>
                              : <h3>No aprobado</h3>}
                        </div>
                  }
                  <div className={'w-3/4 flex flex-col items-center justify-center'}>
                    <h1
                      className={'mt-2 cursor-pointer bg-gradient-to-l from-gray-300 font-bold text-center w-full bg- h-[30px] rounded-r-xl'}>Nombre: {user.firstName} {user.lastName}</h1>
                    <h1 className={''}>ID: {user.idNumber}</h1>
                    <h1 className={''}>Roles: {user?.roles?.map((u, i) => {
                      return (
                        user.roles.length > 1 ? u.name + ', ' : u.name
                      )
                    })}</h1>
                    <h1 className={''}>Tel: {user.phoneNumber}</h1>
                  </div>
                </div>
              )
            })
            : search.length >= 4 && searchData.length === 0
              ? (<h1 className='flex justify-center'>No se encontraron resultados</h1>)
              : data.data.map((user, index) => {
                return (
                <div
                  onClick={() => router.push(`/admin/users/${user._id}`)}
                  key={index}
                  className={index % 2 === 0 ? 'rounded-2xl ml-5 mr-5 mt-5 mb-2 pl-0 bg-white flex flex-row justify-center items-center drop-shadow-2xl' : 'rounded-2xl ml-5 mr-5 mt-5 mb-2 bg-gray-100 flex flex-row justify-center items-center drop-shadow-2xl'}>
                  {
                    user?.roles[0]?.name.includes('client')
                      ? <div
                        className={' border-4 border-green-500 w-[100px] h-[100px] m-0 h-full rounded-full p-0 flex flex-col items-center justify-center'}>
                        <h3 className={'font-bold'}>Cliente</h3>
                      </div>
                      : user.roles[0].name.includes('admin')
                        ? <div
                          className={' border-4 border-yellow-500 w-[100px] h-[100px] m-0 h-full rounded-full p-0 flex flex-col items-center justify-center'}>
                          <h3 className={'font-bold'}>Admin</h3>
                        </div>
                        : <div
                          style={user.roles[0].name.includes('client') ? { visibility: 'hidden' } : { visibility: 'visible' }}
                          className={user.isAproved === 'aproved'
                            ? 'bg-green-300 border-4 border-green-500 w-[100px] h-[100px] m-0 h-full rounded-full p-0 flex flex-col items-center justify-center'
                            : user.isAproved === 'inReview'
                              ? 'bg-orange-300 border-4 border-orange-500 w-[100px] h-[100px] rounded-xl m-0 p-0 flex flex-col items-center justify-center'
                              : 'text-center bg-red-300 border-4 border-red-500 w-[100px] h-[100px] rounded-xl m-0 p-0 flex flex-col items-center justify-center'}>
                          <UserIcon className={'h-10 w-10 text-white'}/>
                          {user.isAproved === 'aproved'
                            ? <h3>Aprobado</h3>
                            : user.isAproved === 'inReview'
                              ? <h3>Pendiente</h3>
                              : <h3>No aprobado</h3>}
                        </div>
                  }
                  <div className={'w-3/4 flex flex-col items-center justify-center'}>
                    <h1
                      className={'mt-2 cursor-pointer bg-gradient-to-l from-gray-300 font-bold text-center w-full bg- h-[30px] rounded-r-xl'}>Nombre: {user.firstName} {user.lastName}</h1>
                    <h1 className={''}>ID: {user.idNumber}</h1>
                    <h1 className={''}>Roles: {user?.roles?.map((u, i) => {
                      return (
                        user.roles.length > 1 ? u.name + ', ' : u.name
                      )
                    })}</h1>
                    <h1 className={''}>Tel: {user.phoneNumber}</h1>
                  </div>
                </div>
                )
              })
          }
          <div className={'mt-5 mb-5 mt-5 flex w-full flex-row items-center justify-center'}>
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
