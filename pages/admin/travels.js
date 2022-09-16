import React, { useEffect, useState } from 'react'
import Nav from '../../components/Nav'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import MobileLayout from '../../components/MobileLayout'
import axios from 'axios'

export default function travels ({ data }) {
  const { user } = useSelector(state => state)
  // const [travels, setTravels] = useState([])

  // useEffect(() => {
  //   axios.get('https://rz-group-backend.herokuapp.com/api/services/all')
  //     .then(res => {
  //       console.log(res.data)
  //       setTravels(res.data)
  //     })
  // }, [])

  const fetcheo = async (e, id) => {
    e.preventDefault()
    console.log(id)
    axios.get(`https://rz-group-backend.herokuapp.com/api/services/${id}`)
      .then(r => {
        console.log(r)
      })
  }

  return (
    <MobileLayout>
      <div className={'md:shadow-2xl bg-[#F7F8FA] h-fit flex items-center flex-col'}>
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
            data.map((travels, index) => {
              return (
                <div onClick={(e) => fetcheo(e, travels._id)}
                     key={index} className={'m-5 bg-white flex flex-col justify-center items-center'}>
                  <h1 className={''}>Estado: {travels.status}</h1>
                  <h1 className={''}>Categoría: {travels.category}</h1>
                  <h1 className={''}>Fecha: {travels.date.slice(0, 10)}</h1>
                </div>
              )
            })
          }
        </div>
      </div>
    </MobileLayout>
  )
}

export async function getServerSideProps () {
  const res = await fetch('https://rz-group-backend.herokuapp.com/api/services/all')
  const data = await res.json()
  console.log(data)
  return {
    props: {
      data
    }
  }
}
