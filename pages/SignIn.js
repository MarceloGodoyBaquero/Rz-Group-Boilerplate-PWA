import Nav from "../components/Nav";
import Image from "next/image";
import LoginImage from '../public/login.svg';
import {useRouter} from "next/router";
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/solid";
import {useState} from "react";

export default function SignIn() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={"bg-[#F7F8FA] h-screen flex items-center flex-col"}>
      <Nav location={'Sign in'}/>
      <Image width={'274px'} height={'287px'} src={LoginImage} alt="hero" className={"w-3/4"}/>
      <div className={'bg-white rounded-xl p-5 m-5 w-full h-fit flex flex-col items-center justify-center'}>
        <div className={'m-2 w-full h-fit flex flex-col items-center justify-center'}>
          <h2 className={"font-bold text-2xl"}>Login</h2>
          <h2>With your email and password</h2>
        </div>
        <div className={'w-full m-2'}>
          <input placeholder={"Email"}
                 className={"indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]"}/>
        </div>

        <div className={'w-full m-2 flex h-[50px] items-center'}>
          <input placeholder={"Password"}
                 type={showPassword ? "text" : "password"}
                 className={"indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]"}/>
          {!showPassword ? <EyeIcon onClick={() => setShowPassword(!showPassword)} className={'cursor-pointer text-[#B8B8B8] h-[40px] w-1/5'}/> :
            <EyeSlashIcon onClick={() => setShowPassword(!showPassword)} className={'cursor-pointer text-[#B8B8B8] h-[40px] w-1/5'} />}
        </div>

        <div className={'w-full m-2'}>
          <button className={"w-full rounded-[25px] h-[50px] text-white bg-[#3A56FF]"}>SIGN IN</button>
        </div>
      </div>
      <div className={'m-2 w-full h-fit flex flex-col items-center justify-center'}>
        <h2>Have not any account? <span onClick={() => router.push('/')}
                                        className={'text-[#3A56FF] font-bold'}>Sign up</span></h2>
      </div>
    </div>
  );
}