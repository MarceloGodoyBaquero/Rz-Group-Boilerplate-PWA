import React, { useEffect, useState } from 'react'
import Nav from '../../components/Nav'
import MobileLayout from '../../components/MobileLayout'
import { useRouter } from 'next/router'
import ReactPaginate from 'react-paginate'
import AdminCompaniesCard from '../../components/AdminCompaniesCard'
import axios from 'axios'

export default function companies ({ data }) {
  const [search, setSearch] = useState('')
  const router = useRouter()
  const [searchData, setSearchData] = useState([])
  useEffect(() => {
    if (search.length > 0) {
      axios.post('https://rz-group-backend.herokuapp.com/api/company/search?name=' + search.toUpperCase())
        .then(data => {
          setSearchData(data.data)
        })
    }
  }, [search])

  const handlePagination = (page) => {
    router.push(`/admin/companies?page=${page.selected + 1}`)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  return (
    <MobileLayout>
      <div className={'md:shadow-2xl bg-[#F7F8FA] h-fit flex items-center flex-col'}>
        <Nav location={'Compañias'} goBack={'/admin'}/>
        <div className={'flex flex-col justify-center w-full items-center'}>
        <div className={'flex justify-center w-full items-center'}>
            <input
              className={'m-5 text-center h-[70px] w-full rounded-full border-2 border-blue-500'}
              type={'search'}
              placeholder={'Buscar compañia por NOMBRE'}
              value={search}
              onChange={(e) => handleSearch(e)}
            />
          </div>
        <div className={'mt-5 mb-5 flex w-full flex-row items-center justify-center'}>
        <div className={'flex flex-col justify-center w-full items-center'}>
        {
          data && search === '' && data.data.map((company, index) => (
            <div key={index} className={'flex flex-col justify-center w-[100%] items-center mt-20'}>
              <AdminCompaniesCard type={company.responsabilidad_tributaria} name={company.name} lastName={company.last_name} id={company._id} idNumber={company.Id_number} address={company.address}/>
            </div>
          ))
        }
        {
          searchData && search !== '' && searchData.map((company, index) => (
            <div key={index} className={'flex flex-col justify-center w-[100%] items-center mt-20'}>
              <AdminCompaniesCard type={company.responsabilidad_tributaria} name={company.name} lastName={company.last_name} id={company._id} idNumber={company.Id_number} address={company.address}/>
            </div>
          ))
        }
        </div>
        </div>
        { search === '' &&
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
        }

        </div>
      </div>
    </MobileLayout>
  )
}
export async function getServerSideProps (context) {
  const res = await fetch(`https://rz-group-backend.herokuapp.com/api/company?skip=${context.query.page - 1}&limit=10`)
  const data = await res.json()
  console.log(data)
  return {
    props: {
      data
    }
  }
}
