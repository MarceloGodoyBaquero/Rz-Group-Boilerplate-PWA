import Link from "next/link";

export default function SplashScreen() {

  return (
    <div className={"bg-black h-screen flex items-center flex-col justify-center"}>
      <div className={" flex justify-center rounded-[50%] items-center hover:border-2 border-violet-500 hover:h-[300px] hover:w-[300px]"}>
        <div
          className={"bg-white h-[260px] w-[260px] rounded-[50%] flex item-center justify-center"}>
          <Link href={"/SignIn"}>
            <button className={"text-2xl h-[260px] w-[260px] rounded-[50%]"}></button>
          </Link>
        </div>
      </div>
    </div>
  );
}
