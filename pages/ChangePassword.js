import Nav from "../components/Nav";
import Image from "next/image";
import ChangePassword from '../public/Images/ChangePassword.svg';
import {useRouter} from "next/router";
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/solid";
import {useState} from "react";
import MobileLayout from "../components/MobileLayout";

export default function SignIn() {
  const router = useRouter();
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  return (
    <MobileLayout>
      <div className={" md:shadow-2xl bg-[#F7F8FA] h-screen flex items-center flex-col"}>
        <Nav location={'Change Password'}/>
        <Image width={'274px'} height={'287px'} src={ChangePassword} alt="hero" className={"w-3/4"}/>
        <div className={'bg-white rounded-xl p-5 m-5 w-5/6 h-fit flex flex-col items-center justify-center shadow-lg'}>
          <div className={'w-full m-2 flex h-[50px] items-center'}>
            <input
              placeholder={"Password"}
              type={showPassword1 ? "text" : "password"}
              className={"indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]"}/>
            {!showPassword1 ?
              <EyeIcon
                onClick={() => setShowPassword1(!showPassword1)}
                className={'cursor-pointer text-[#B8B8B8] h-[40px] w-1/5'}/> :
              <EyeSlashIcon
                onClick={() => setShowPassword1(!showPassword1)}
                className={'cursor-pointer text-[#B8B8B8] h-[40px] w-1/5'}/>}
          </div>
          <div className={'w-full m-2 flex h-[50px] items-center'}>
            <input
              placeholder={"Repeat Password"}
              type={showPassword2 ? "text" : "password"}
              className={"indent-5 outline-0 w-full rounded-[25px] h-[50px] font-bold text-black bg-[#F4F5F7]"}/>
            {!showPassword2 ?
              <EyeIcon
                onClick={() => setShowPassword2(!showPassword2)}
                className={'cursor-pointer text-[#B8B8B8] h-[40px] w-1/5'}/> :
              <EyeSlashIcon
                onClick={() => setShowPassword2(!showPassword2)}
                className={'cursor-pointer text-[#B8B8B8] h-[40px] w-1/5'}/>}
          </div>
          <div className={'w-full m-2'}>
            <button className={"w-full rounded-[25px] h-[50px] text-white bg-[#3A56FF]"}>Change</button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}