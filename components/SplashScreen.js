import Link from "next/link";
import Image from "next/image";
import {useRouter} from "next/router";
import Logo from "../public/icon-512x512.png";
import {useEffect} from "react";

export default function SplashScreen() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push('/SignIn')
    }, 3000);
  }, []);

  return (
    <div className={"h-screen flex items-center flex-col justify-center"}>
      <div className={"flex justify-center"}>
        <div
          className={"drop-shadow-2xl bg-white h-[260px] w-[260px] rounded-[50%] flex item-center justify-center animate-pulse"}>
          <div className={"h-[260px] w-[260px] rounded-[50%] flex items-center justify-center"}>
            <Image height={'200px'} width={'200px'} src={Logo} alt={'Rz Group'}/>
          </div>
        </div>
      </div>
    </div>
  );
}
