import Nav from "../components/Nav";
import Image from "next/image";
import SignUp from '../public/Images/SignUp.svg';
import {useRouter} from "next/router";
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/solid";
import {useState} from "react";
import MobileLayout from "../components/MobileLayout";

export default function SignIn() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <MobileLayout>
      <div className={"md:shadow-2xl bg-[#F7F8FA] h-screen flex items-center flex-col"}>
        <Nav location={'Sign Up'}/>
        <div className={'h-1/2 flex justify-center'}>
          <Image width={'274px'} height={'287px'} src={SignUp} alt="hero" className={"w-3/4"}/>
        </div>
        <div className={'bg-white rounded-xl p-5 m-5 w-5/6 h-fit flex flex-col items-center justify-center shadow-lg'}>
          <div className={'m-2 w-full h-fit flex flex-col items-center justify-center'}>
            <h2 className={"font-bold text-2xl"}>Sign Up</h2>
            <h2>Please complete all the fields</h2>
          </div>

          <div className={'w-full m-2 pl-5 pr-5 flex flex-row justify-between'}>
            <label>
              <input className={''} type={'radio'} name={"radio"} value={'Owner'}/>
              Owner
            </label>
            <label>
              <input type={'radio'} name={"radio"} value={'Driver'}/>
              Driver
            </label>
            <label>
              <input type={'radio'} name={"radio"} value={'Rider'}/>
              Rider
            </label>
          </div>

          <div className={'w-full m-2'}>
            <input placeholder={"First Name"}
                   className={"indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]"}/>
          </div>
          <div className={'w-full m-2'}>
            <input placeholder={"Last Name"}
                   className={"indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]"}/>
          </div>
          <div className={'w-full m-2'}>
            <input placeholder={"Email"}
                   className={"indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]"}/>
          </div>
          <div className={'w-full m-2'}>
            <input placeholder={"ID number"}
                   className={"indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]"}/>
          </div>
          <div className={'w-full m-2'}>
            <input placeholder={"Phone Number"}
                   className={"indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]"}/>
          </div>

          <div className={'w-full m-2 flex h-[50px] items-center'}>
            <input placeholder={"Password"}
                   type={showPassword ? "text" : "password"}
                   className={"indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]"}/>
            {!showPassword ? <EyeIcon onClick={() => setShowPassword(!showPassword)}
                                      className={'cursor-pointer text-[#B8B8B8] h-[40px] w-1/5'}/> :
              <EyeSlashIcon onClick={() => setShowPassword(!showPassword)}
                            className={'cursor-pointer text-[#B8B8B8] h-[40px] w-1/5'}/>}
          </div>
          <div className={'w-full m-2 flex h-[50px] items-center'}>
            <input placeholder={" Repeat Password"}
                   type={showPassword ? "text" : "password"}
                   className={"indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]"}/>
            {!showPassword ? <EyeIcon onClick={() => setShowPassword(!showPassword)}
                                      className={'cursor-pointer text-[#B8B8B8] h-[40px] w-1/5'}/> :
              <EyeSlashIcon onClick={() => setShowPassword(!showPassword)}
                            className={'cursor-pointer text-[#B8B8B8] h-[40px] w-1/5'}/>}
          </div>
          <div className={'w-full m-2'}>
            <button className={"w-full rounded-[25px] h-[50px] text-white bg-[#3A56FF]"}>SIGN UP</button>
          </div>
        </div>
        <div className={'m-2 w-full h-fit flex flex-col items-center justify-center'}>
          <h2>Have not any account? <span onClick={() => router.push('/SignIn')}
                                          className={'text-[#3A56FF] font-bold cursor-pointer'}>Sign in</span></h2>
          <h2 onClick={() => router.push('/ForgetPassword')}
              className={'mt-2 text-[#3A56FF] font-bold cursor-pointer'}>I forget my password</h2>
        </div>
      </div>
    </MobileLayout>
  );
}