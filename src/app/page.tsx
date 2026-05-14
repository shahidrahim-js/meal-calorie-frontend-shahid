"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/stores/authStore";
import { instrumentSerif } from "@/lib/fonts";

export default function HomePage() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    router.replace(token ? '/dashboard' : '/');
  }, [token, router]);
  
  return (
    <>
    <div className="sm:max-w-[80vw] mx-auto min-h-[80vh] relative">
      <div className="grid grid-flow-row sm:grid-flow-col grid-rows-1 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16">
        <div className=" flex flex-col justify-center items-start row-start-2 sm:row-start-1">
          <h1 className={`${instrumentSerif.className} text-6xl md:text-8xl font-medium text-red-600 
          dark:text-red-500 leading-none`}>Meal Calorie</h1>
          <h3 className={`${instrumentSerif.className} italic text-4xl font-medium text-red-800 
          dark:text-red-200 leading-normal`}>Count Generator</h3>
          <p className="text-black-500 mt-4 mb-6 text-red-950 dark:text-white">
            Track meals, count calories, and monitor workouts effortlessly, all in one place. 
            The <span className={`bg-red-200 
              text-red-950 px-1 py-0.5 ${instrumentSerif.className}`}>Meal Calorie Count Generator</span> 
              helps you build healthier habits and stay on track with your fitness goals.
          </p>
          <Link href='/register' className="py-3 lg:py-3 px-12 lg:px-16 text-red-950 font-semibold rounded-lg border 
          border-amber-400 bg-amber-300 transition-all outline-none undefined capitalize hover:bg-transparent 
          hover:text-red-950 hover:border-red-800 dark:hover:border-amber-300 dark:hover:text-amber-300 cursor-pointer">
            Register
          </Link>
        </div>
        <div className="flex w-full">
          <div className="h-auto md:h-full md:w-full">
            <span className="box-sizing:border-box display:block overflow:hidden width:initial height:initial 
            background:none opacity:1 border:0 margin:0 padding:0">
              <Image src="/meal-calorie-tracking.jpg"
                alt="Meal Calorie"
                width={400}
                height={400}
                priority
                className="h-auto w-3/4.5 object-cover rounded-2xl transition-all animation-duration-[5s]" />
            </span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};