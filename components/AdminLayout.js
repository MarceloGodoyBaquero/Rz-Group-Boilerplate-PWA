import React from 'react'
import Nav from './Nav'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { signOut } from '../Redux/Actions/authActions/index'

export default function AdminLayout () {
  const { user } = useSelector(state => state)
  const router = useRouter()
  const dispatch = useDispatch()
  if (user.roles !== 'admin') router.push('/')
  const handleLogout = () => {
    dispatch(signOut())
  }
  return (
    <div className={'md:shadow-2xl bg-[#F7F8FA] h-screen flex items-center flex-col'}>
      <Nav location={'Admin Dashboard'}/>
      <div className={'flex flex-col justify-center w-full'}>
        <div className={'w-full flex flex-col justify-center items-center'}>
          <h1 className={'font-bold text-2xl'}>Bienvenido {user.name}</h1>
          <div className={'w-full flex flex-col justify-center items-center'}>
            <h1 className={'text-2xl'}>Menú de Administrador</h1>
            <button
              className={'w-5/6 h-[70px] bg-blue-500 text-white font-bold rounded-full p-2 m-2'}
              onClick={() => router.push('/admin/users')}>
              VER USUARIOS
            </button>
            <button
              className={'w-5/6 h-[70px] bg-blue-500 text-white font-bold rounded-full p-2 m-2'}
              onClick={() => router.push('/admin/vehicles')}>
              VER VEHÍCULOS
            </button>
            <button
              className={'w-5/6 h-[70px] bg-blue-500 text-white font-bold rounded-full p-2 m-2'}
              onClick={() => router.push('/admin/travels')}>
              VER VIAJES
            </button>
            <button
              className={'w-5/6 h-[70px] bg-blue-500 text-white font-bold rounded-full p-2 m-2'}
              onClick={() => router.push('/admin/create/company')}>
              CREAR COMPAÑIA
            </button>
            <button
              className={'w-5/6 h-[70px] bg-blue-500 text-white font-bold rounded-full p-2 m-2'}
              onClick={() => router.push('/admin/companies')}>
              VER COMPAÑIAS
            </button>
            <button
              className={'w-5/6 h-[70px] bg-blue-500 text-white font-bold rounded-full p-2 m-2'}
              onClick={() => router.push('/admin/clientesExternos')}>
              VER CLIENTES EXTERNOS
            </button>
            <button className={'w-5/6 h-[70px] bg-red-500 text-white font-bold rounded-full p-2 m-2 mt-10'} onClick={() => handleLogout()}>
              CERRAR SESIÓN
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
