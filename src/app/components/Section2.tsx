import Image from "next/image";
import Link from "next/link";
import React from "react";

function Section2() {
  return (
    <div className="relative">
    <div className=" flex justify-center mb-10">
   
      <Image
        className="w-[1200px] h-[350px] opacity-90 rounded-lg object-cover"
        src="/sec2.jpg"
        alt="Description"
        width={1200}
        height={350}
      />

     </div>
     <div className="absolute inset-0 flex flex-col justify-center items-center p-4 md:items-start md:p-6 lg:p-8 xl:items-center xl:text-center">
  <h2 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2">
    Buy Now.. The Latest Tech Laptop
  </h2>
  <h1 className="text-white font-semibold text-base sm:text-lg md:text-xl mb-4">
    MK Web
  </h1>
<Link href="#product">
  <button className="bg-green-700 hover:bg-green-500 text-white py-2 px-4 rounded w-24 sm:w-28 lg:w-32 text-sm sm:text-base cursor-pointer">
    Buy Now
  </button>
</Link>
</div>

    </div>
  );
}

export default Section2;
