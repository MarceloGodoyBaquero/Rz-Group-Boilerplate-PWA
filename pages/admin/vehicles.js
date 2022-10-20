import React, { useEffect } from 'react'
import Nav from '../../components/Nav'
import MobileLayout from '../../components/MobileLayout'
import ReactPaginate from 'react-paginate'
import { useRouter } from 'next/router'
import { IoCarSportSharp } from 'react-icons/io5'

export default function vehicles ({ data }) {
  const router = useRouter()
  const [search, setSearch] = React.useState('')
  const [searchData, setSearchData] = React.useState([])
  useEffect(() => {
    fetch('https://rz-group-backend.herokuapp.com/api/admin/vehicle/search?carPlate=' + search)
      .then(res => res.json())
      .then(data => {
        setSearchData(data)
      })
  }, [search])

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }
  const handlePagination = (page) => {
    page.selected > 0 && router.push(`/admin/vehicles?page=${page.selected + 1}`)
  }

  return (
    <MobileLayout>
      <div className={'md:shadow-2xl bg-[#F7F8FA] h-fit flex items-center flex-col'}>
        <Nav location={'Vehículos'} goBack={'/admin'}/>
        <div className={'flex flex-col justify-center w-full'}>
          <div className={'flex justify-center w-full items-center'}>
            <input
              className={'m-5 text-center h-[70px] w-full rounded-full border-2 border-blue-500'}
              type={'search'}
              placeholder={'Buscar vehiculo por MATRICULA'}
              value={search}
              onChange={(e) => handleSearch(e)}
            />
          </div>

          {searchData.length > 0
            ? searchData.map((vehicle, index) => {
              const { owner } = vehicle
              return (
                <div
                  onClick={() => router.push(`/admin/vehicles/${vehicle._id}`)}
                  key={index}
                  className={index % 2 === 0 ? 'rounded-2xl ml-5 mr-5 mt-5 mb-2 pl-0 bg-white flex flex-row justify-center items-center drop-shadow-2xl' : 'rounded-2xl ml-5 mr-5 mt-5 mb-2 bg-gray-100 flex flex-row justify-center items-center drop-shadow-2xl'}>
                  <div className={vehicle.isAproved === 'aproved'
                    ? 'bg-green-300 border-4 border-green-500 w-[100px] h-[100px] m-0 h-full rounded-full p-0 flex flex-col items-center justify-center'
                    : vehicle.isAproved === 'inReview'
                      ? 'bg-orange-300 border-4 border-orange-500 w-[100px] h-[100px] rounded-xl m-0 p-0 flex flex-col items-center justify-center'
                      : 'text-center bg-red-300 border-4 border-red-500 w-[100px] h-[100px] rounded-xl m-0 p-0 flex flex-col items-center justify-center'}>
                    <IoCarSportSharp className={'h-10 w-10 text-white'}/>
                    {vehicle.isAproved === 'aproved'
                      ? <h3>Aprobado</h3>
                      : vehicle.isAproved === 'inReview'
                        ? <h3>Pendiente</h3>
                        : <h3>No aprobado</h3>}
                  </div>
                  <div className={'w-3/4 flex flex-col items-center justify-center'}>
                    <h1
                      className={'mt-2 cursor-pointer bg-gradient-to-l from-gray-300 font-bold text-center w-full bg- h-[30px] rounded-r-xl'}>Dueño: {`${owner?.firstName} ${owner?.lastName}`}</h1>
                    <ul>
                      <li className={''}>Marca: {vehicle.brand}</li>
                      <li className={''}>Modelo: {vehicle.model}</li>
                      <li className={''}>Matricula: {vehicle.carPlate}</li>
                      <li className={''}>Categoría: {vehicle.category}</li>
                      <li className={''}>Fecha de subida: {vehicle?.createdAt?.slice(0, 10)}</li>
                    </ul>
                  </div>
                </div>
              )
            })
            : search.length >= 1 && searchData.length === 0
              ? (<h1>no se encontraron resultados</h1>)
              : data.vehicles.map((vehicle, index) => {
                const { owner } = vehicle
                return (
                  <div
                    onClick={() => router.push(`/admin/vehicles/${vehicle._id}`)}
                    key={index}
                    className={index % 2 === 0 ? 'rounded-2xl ml-5 mr-5 mt-5 mb-2 pl-0 bg-white flex flex-row justify-center items-center drop-shadow-2xl' : 'rounded-2xl ml-5 mr-5 mt-5 mb-2 bg-gray-100 flex flex-row justify-center items-center drop-shadow-2xl'}>
                    <div className={vehicle.isAproved === 'aproved'
                      ? 'bg-green-300 border-4 border-green-500 w-[100px] h-[100px] m-0 h-full rounded-full p-0 flex flex-col items-center justify-center'
                      : vehicle.isAproved === 'inReview'
                        ? 'bg-orange-300 border-4 border-orange-500 w-[100px] h-[100px] rounded-xl m-0 p-0 flex flex-col items-center justify-center'
                        : 'text-center bg-red-300 border-4 border-red-500 w-[100px] h-[100px] rounded-xl m-0 p-0 flex flex-col items-center justify-center'}>
                      <IoCarSportSharp className={'h-10 w-10 text-white'}/>
                      {vehicle.isAproved === 'aproved'
                        ? <h3>Aprobado</h3>
                        : vehicle.isAproved === 'inReview'
                          ? <h3>Pendiente</h3>
                          : <h3>No aprobado</h3>}
                    </div>
                    <div className={'w-3/4 flex flex-col items-center justify-center'}>
                      <h1
                        className={'mt-2 cursor-pointer bg-gradient-to-l from-gray-300 font-bold text-center w-full bg- h-[30px] rounded-r-xl'}>Dueño: {`${owner?.firstName} ${owner?.lastName}`}</h1>
                      <ul>
                        <li className={''}>Marca: {vehicle.brand}</li>
                        <li className={''}>Modelo: {vehicle.model}</li>
                        <li className={''}>Matricula: {vehicle.carPlate}</li>
                        <li className={''}>Categoría: {vehicle.category}</li>
                        <li className={''}>Fecha de subida: {vehicle?.createdAt?.slice(0, 10)}</li>
                      </ul>
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
              currentPage={data.page + 1}
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
  const res = await fetch(`https://rz-group-backend.herokuapp.com/api/admin/vehicles?skip=${context.query.page - 1}&limit=10`)
  const data = await res.json()
  console.log(data)
  return {
    props: {
      data
    }
  }
}
