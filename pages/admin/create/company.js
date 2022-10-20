import React, { useState } from 'react'
import Nav from '../../../components/Nav'
import MobileLayout from '../../../components/MobileLayout'
import axios from 'axios'
import { Button } from 'flowbite-react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'

export default function companyCreate () {
  const [naturalPerson, setNaturalPerson] = useState(false)
  const [company, setCompany] = useState(false)

  const [companyForm, setCompanyForm] = useState({
    name: '',
    Id_type: 'Número de identificación tributaria',
    Id_number: '',
    verification_digit: '',
    person_type: 'Régimen común',
    responsabilidad_tributaria: 'Persona Juridica',
    phone: '',
    email: '',
    country: '',
    state: '',
    city: '',
    address: '',
    postal_code: '',
    type: 'company'
  })

  const [naturalPersonForm, setNaturalPersonForm] = useState({
    name: '',
    last_name: '',
    Id_type: 'Cédula de ciudadanía',
    Id_number: '',
    person_type: 'Régimen simplificado',
    responsabilidad_tributaria: 'Persona Natural',
    phone: '',
    country: '',
    state: '',
    city: '',
    address: '',
    postal_code: ''
  })

  const handleCompanyChange = (e) => {
    setCompanyForm({
      ...companyForm,
      [e.target.name]: e.target.value
    })
  }
  const handleNaturalPersonChange = (e) => {
    setNaturalPersonForm({
      ...naturalPersonForm,
      [e.target.name]: e.target.value
    })
  }

  const handleNaturalPerson = () => {
    setNaturalPerson(true)
    setCompany(false)
  }
  const handleCompany = () => {
    setCompany(true)
    setNaturalPerson(false)
  }

  const handleSubmit = async () => {
    if (naturalPerson) {
      axios.post('https://rz-group-backend.herokuapp.com/api/company/create', {
        ...naturalPersonForm,
        name: `${naturalPersonForm.name.toUpperCase()}`,
        last_name: `${naturalPersonForm.last_name.toUpperCase()}`
      })
        .then(res => {
          toast.success('Persona agregada con éxito')
        })
    } else if (company) {
      axios.post('https://rz-group-backend.herokuapp.com/api/company/create', {
        ...companyForm,
        name: `${companyForm.name.toUpperCase()}`
      })
        .then(res => {
          toast.success('Compañia creada con exito')
        })
    }
  }

  return (
    <MobileLayout>
      <div className={'md:shadow-2xl bg-[#F7F8FA] h-screen flex items-center flex-col'}>
        <Nav location={'Crear compañia'} goBack={'/admin'}/>
        <ToastContainer/>
      <div className={'flex flex-col justify-center w-full items-center'}>
      { !naturalPerson && !company &&
      <>
        <p className='font-bold'>
                      ¿Que responsabilidad <br /> tributaria tiene la compañia?
                    </p>
                    <div className='w-full flex flex-col justify-evenly items-center mt-5 mb-5'>
                      <div>
                        <label className='font-bold'>Persona Natural</label>
                        <input type="checkbox" className='rounded-full ml-3' checked={naturalPerson}
                               onChange={() => handleNaturalPerson()}/>
                      </div>
                      <div className='mt-8'>
                        <label className='font-bold'>Persona Juridíca</label>
                        <input type="checkbox" className='rounded-full ml-3' checked={company}
                               onChange={() => handleCompany()}/>
                      </div>
                    </div>
                    </>}
                    {
                      company &&
                      <div className='w-full flex flex-col justify-evenly items-center mt-5 mb-5'>
                        <div className='flex justify-center items-center mb-3 bg-[#5b211f] rounded-lg w-1/3' onClick={() => setCompany(false)}>
                          <ArrowLeftIcon className='h-5 w-8 cursor-pointer text-white'/>
                          <span className='font-bold text-white'>Volver</span>
                        </div>
                        <form className={'bg-white rounded-xl p-5 m-3 w-5/6 h-fit flex flex-col items-center justify-center shadow-lg'}>
                    <div className={'w-full m-2'}>
                      <input placeholder={'Nombre'}
                        className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                        name={'name'}
                        type={'text'}
                        value={companyForm.name}
                        onChange={(e) => handleCompanyChange(e)} />
                      </div>
                      <div className={'w-full m-2'}>
                      <input placeholder={'NIT'}
                        className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                        name={'Id_number'}
                        type={'number'}
                        value={companyForm.Id_number}
                        onChange={(e) => handleCompanyChange(e)} />
                      </div>
                      <div className={'w-full m-2'}>
                      <input placeholder={'Digito de verificación'}
                        className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                        name={'verification_digit'}
                        type={'number'}
                        value={companyForm.verification_digit}
                        onChange={(e) => handleCompanyChange(e)} />
                      </div>
                      <div className={'w-full m-2'}>
                      <input placeholder={'Número telefonico'}
                        className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                        name={'phone'}
                        type={'number'}
                        value={companyForm.phone}
                        onChange={(e) => handleCompanyChange(e)} />
                      </div>
                      <div className={'w-full m-2'}>
                      <input placeholder={'Email'}
                        className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                        name={'email'}
                        type={'text'}
                        value={companyForm.email}
                        onChange={(e) => handleCompanyChange(e)} />
                      </div>
                      <div className={'w-full m-2'}>
                      <input placeholder={'País'}
                        className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                        name={'country'}
                        type={'text'}
                        value={companyForm.country}
                        onChange={(e) => handleCompanyChange(e)} />
                      </div>
                      <div className={'w-full m-2'}>
                      <input placeholder={'Estado'}
                        className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                        name={'state'}
                        type={'text'}
                        value={companyForm.state}
                        onChange={(e) => handleCompanyChange(e)} />
                      </div>
                      <div className={'w-full m-2'}>
                      <input placeholder={'Ciudad'}
                        className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                        name={'city'}
                        type={'text'}
                        value={companyForm.city}
                        onChange={(e) => handleCompanyChange(e)} />
                      </div>
                      <div className={'w-full m-2'}>
                      <input placeholder={'Dirección'}
                        className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                        name={'address'}
                        type={'text'}
                        value={companyForm.address}
                        onChange={(e) => handleCompanyChange(e)} />
                      </div>
                      <div className={'w-full m-2'}>
                      <input placeholder={'Codigo postal'}
                        className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                        name={'postal_code'}
                        type={'text'}
                        value={companyForm.postal_code}
                        onChange={(e) => handleCompanyChange(e)} />
                      </div>
                      <div className={'w-full m-2 flex justify-center items-center'}>
                      <Button className={'w-full'} onClick={() => handleSubmit()} color='success'>Crear compañia</Button>
                      </div>
                        </form>
                      </div>
                    }
                    {
                      naturalPerson &&
                      <div className='w-full flex flex-col justify-evenly items-center mt-5 mb-5'>
                        <div className='flex justify-center items-center mb-3 bg-[#5b211f] rounded-lg w-1/3' onClick={() => setNaturalPerson(false)}>
                          <ArrowLeftIcon className='h-5 w-8 cursor-pointer text-white'/>
                          <span className='font-bold text-white'>Volver</span>
                        </div>
                        <form className={'bg-white rounded-xl p-5 m-5 w-5/6 h-fit flex flex-col items-center justify-center shadow-lg'}>
                    <div className={'w-full m-2'}>
                      <input placeholder={'Nombre'}
                        className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                        name={'name'}
                        type={'text'}
                        value={naturalPersonForm.name}
                        onChange={(e) => handleNaturalPersonChange(e)} />
                      </div>
                      <div className={'w-full m-2'}>
                      <input placeholder={'Apellido'}
                        className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                        name={'last_name'}
                        type={'text'}
                        value={naturalPersonForm.last_name}
                        onChange={(e) => handleNaturalPersonChange(e)} />
                      </div>
                      <div className={'w-full m-2'}>
                      <input placeholder={'Cedula'}
                        className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                        name={'Id_number'}
                        type={'number'}
                        value={naturalPersonForm.Id_number}
                        onChange={(e) => handleNaturalPersonChange(e)} />
                      </div>
                      <div className={'w-full m-2'}>
                      <input placeholder={'Número telefonico'}
                        className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                        name={'phone'}
                        type={'number'}
                        value={naturalPersonForm.phone}
                        onChange={(e) => handleNaturalPersonChange(e)} />
                      </div>
                      <div className={'w-full m-2'}>
                      <input placeholder={'País'}
                        className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                        name={'country'}
                        type={'text'}
                        value={naturalPersonForm.country}
                        onChange={(e) => handleNaturalPersonChange(e)} />
                      </div>
                      <div className={'w-full m-2'}>
                      <input placeholder={'Estado'}
                        className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                        name={'state'}
                        type={'text'}
                        value={naturalPersonForm.state}
                        onChange={(e) => handleNaturalPersonChange(e)} />
                      </div>
                      <div className={'w-full m-2'}>
                      <input placeholder={'Ciudad'}
                        className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                        name={'city'}
                        type={'text'}
                        value={naturalPersonForm.city}
                        onChange={(e) => handleNaturalPersonChange(e)} />
                      </div>
                      <div className={'w-full m-2'}>
                      <input placeholder={'Dirección'}
                        className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                        name={'address'}
                        type={'text'}
                        value={naturalPersonForm.address}
                        onChange={(e) => handleNaturalPersonChange(e)} />
                      </div>
                      <div className={'w-full m-2'}>
                      <input placeholder={'Codigo postal'}
                        className={'indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]'}
                        name={'postal_code'}
                        type={'text'}
                        value={naturalPersonForm.postal_code}
                        onChange={(e) => handleNaturalPersonChange(e)} />
                      </div>
                      <div className={'w-full m-2 flex justify-center items-center'}>
                      <Button className={'w-full'} onClick={() => handleSubmit()} color='success'>Crear compañia</Button>
                      </div>
                        </form>
                      </div>
                    }
      </div>
      </div>
    </MobileLayout>
  )
}
