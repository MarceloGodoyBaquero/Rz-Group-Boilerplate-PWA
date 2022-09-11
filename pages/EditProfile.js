import React from 'react'
/* import { Feather, FontAwesome, FontAwesome5 } from 'react-web-vector-icons' */
/* import Button from '../Components/Button' */
import Camera from '../public/Images/camera.svg'
import Image from 'next/image'
import Nav from '../components/Nav'
import MobileLayout from '../components/MobileLayout'
import defaultImage from '../public/Images/fakeimg.png'
import Pencil from '../public/Images/Pencil.svg'

function ProfileEdit () {
  return (
    <MobileLayout>
        <div className="md:shadow-2xl  bg-white  h-screen">
          <Nav location={'Edit Profile'} cosito={true}/>
          <div className="bg-gray-50 mt-2 px-4 py-2">
            <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-xl p-4">
              <div className=" rounded-full relative">
                <Image
                  className="w-20 h-20 rounded-full"
                  src={defaultImage}
                  width={'100%'}
                  height={'100%'}
                  alt="Rounded avatar"
                />
                <div className="absolute bottom-0 right-0">
                    <Image src={Camera} alt="camera" width={20} height={20} />
                </div>
              </div>
              <div className="flex-1 mt-4">
                <div className='border-b-2 pb-1 border-[#707070-200]'>
                <h1 className="font-bold text-base text-black">Jhon Smith</h1>
                </div>
                <div className='border-b-2 border-[#707070-200] mt-1 mb-1 pb-1'>
                <p className="text-sm text-gray-500">Gold Member</p>
                </div>

              </div>
            </div>
            <div className="mt-5 ">
              <div className="bg-white">
                <div className="bg-gray-200 flex px-6 py-3 items-center justify-between rounded-full my-2">
                  <p className="font-bold text-base text-black">William Jonson</p>
                  <Image src={Pencil} alt="Pencil" width={15} height={15}/>
                </div>
                <div className="bg-gray-200 flex px-6 py-3 items-center justify-between rounded-full my-2">
                  <p className="font-bold text-base text-black">+880 000 111 333</p>
                  <Image src={Pencil} alt="Pencil" width={15} height={15}/>
                </div>
                <div className="bg-gray-200 flex px-6 py-3 items-center justify-between rounded-full my-2">
                  <p className="font-bold text-base text-black">
                    youremail@website.com
                  </p>
                  <Image src={Pencil} alt="Pencil" width={15} height={15}/>
                </div>
                <div className="bg-gray-200 flex px-6 py-3 items-center justify-between rounded-full my-2">
                  <p className="font-bold text-base text-black">
                    Iris Watson P.O.Box 283...
                  </p>
                  <Image src={Pencil} alt="Pencil" width={15} height={15}/>
                </div>

                <div className={'w-full mt-5'}>
            <button className={'w-full rounded-[25px] h-[50px] text-white font-bold bg-[#5B211F]'}>Save Now</button>
          </div>
              </div>
            </div>
          </div>
        </div>
        </MobileLayout>
  )
}

export default ProfileEdit
