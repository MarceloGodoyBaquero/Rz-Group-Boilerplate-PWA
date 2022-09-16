import React, { useEffect, useState } from 'react'
import Nav from '../../components/Nav'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import MobileLayout from '../../components/MobileLayout'
import axios from 'axios'

export default function users () {
  const { user } = useSelector(state => state)
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('https://rz-group-backend.herokuapp.com/api/user')
      .then(res => {
        console.log(res.data)
        setUsers(res.data)
      })
  }, [])

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
          {
            users.map((user, index) => {
              return (
                <div key={index} className={'m-5 bg-white flex flex-col justify-center items-center'}>
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
