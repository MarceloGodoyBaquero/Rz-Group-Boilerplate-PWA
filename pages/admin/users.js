import React, { useEffect, useState } from 'react'
import Nav from '../../components/Nav'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import MobileLayout from '../../components/MobileLayout'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
// import axios from 'axios'

export default function users ({ data }) {
  const { user } = useSelector(state => state)
  const router = useRouter()
  // const [users, setUsers] = useState([])

  // useEffect(() => {
  //   axios.get('https://rz-group-backend.herokuapp.com/api/user')
  //     .then(res => {
  //       console.log(res.data)
  //       setUsers(res.data)
  //     })
  // }, [])

  // const fetchUsers = async (id) => {
  //   axios.get('https://rz-group-backend.herokuapp.com/api/user/' + id)
  //     .then(res => {
  //       console.log(res.data)
  //     })
  // }

  return (
    <MobileLayout>
      <div className={'md:shadow-2xl bg-[#F7F8FA] h-fit flex items-center flex-col'}>
        <Nav location={'Usuarios'}/>
        <div className={'flex flex-col justify-center w-full'}>
          <div className={'flex justify-center w-full items-center'}>
            <input
              className={'m-5 text-center h-[70px] w-full rounded-full border-2 border-blue-500'}
              type={'search'}
              placeholder={'Buscar usuario por ID'}
            />
          </div>
          <div className={'flex flex-row items-center justify-center'}>
            <ReactPaginate
              className={'flex flex-row items-center justify-center'}
              breakLabel={'...'}
              nextLabel={'>'}
              previousLabel={'<'}
              pageRangeDisplayed={5}
              pageCount={10}
            />
          </div>
          {
            data.map((user, index) => {
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
        </div>
      </div>
    </MobileLayout>
  )
}

export async function getServerSideProps (page) {
  const res = await fetch(`https://rz-group-backend.herokuapp.com/api/user?skip=${1}&limit=10`)
  const data = await res.json()
  console.log(data)
  return {
    props: {
      data
    }
  }
}
