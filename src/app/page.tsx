"use client"
import Image from "next/image";
import { motion, AnimatePresence } from 'framer-motion'
import Product from "./components/Product";
import Section1 from "./components/Section1";
import Link from "next/link";
import Section2 from "./components/Section2";



export default function Home() {
  return (
    <div className="relative min-h-full overflow-hidden">
      <Image className=" absolute object-cover w-full h-full inset-0 -z-10" src="/bg-purp.jpg" alt="Description" width={1500} height={1500} />
      <div className="flex flex-col-reverse sm:flex-row justify-between items-center w-full p-12 sm:p-16 md:p-20 lg:p-32 gap-8">
        <div className="space-y-5 text-center sm:text-left">
        <h1 className=" text-2xl sm:text-[27px] md:text-4xl xl:text-5xl font-bold text-purple-600">Laptop for the future</h1>
        <p className="text-[13px] sm:text-[17px] md:text-xl xl:text-2xl font-semibold text-gray-600">Discover the latest innovations in laptop technology. <br className="hidden sm:block" /> You can find the best laptops for your needs.</p>
        <p className="md:text-2xl font-bold text-green-600">$600</p>
       <Link href="#product"><button className="bg-green-700 hover:bg-green-500 text-white py-2 px-4 rounded">Buy Now</button></Link>
        </div>

    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        whileInView={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -300 }}
        transition={{ duration : 1.5 , ease: "easeInOut" }}
      >
        <Image className="max-w-[300px] sm:max-w-[500px] w-full h-auto" src="/home-lap.png" alt="Description" width={1000} height={1000} />
      </motion.div>
    </AnimatePresence>
         </div>
         <div id="product" className=" bg-white rounded-lg shadow-lg p-10">
         <Product/>
         </div>
       <Section1/>
       <Section2/>
    </div>
  );
}
