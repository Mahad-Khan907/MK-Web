"use client"
import Link from 'next/link'
import { HiOutlineMenuAlt2, HiOutlineX } from "react-icons/hi";
import { IoCartOutline } from "react-icons/io5";
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { usePathname } from 'next/navigation';



function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => {
    setIsOpen(!isOpen)

  }
  const pathname = usePathname();
  return (
    <div className='sticky top-0 z-50 left-0'>

      <div className='bg-purple-800 flex justify-center items-center'>
        <div className='max-w-7xl ml-3 mr-3 xl:mx-auto py-4 flex items-center justify-between w-full '>

          <h1 className='text-white text-3xl md:text-3xl lg:text-3xl font-bold ml-3'>MK<span className='text-cyan-400'>Web</span></h1>
          <div className='space-x-8 hidden md:flex font-bold '>
            <Link href="/" className='text-white hover:bg-white rounded-lg hover:text-black hover:p-1 text-xl'>Home</Link>
            <Link
              href={pathname === "/" ? "#product" : "/#product"}
              className='text-white hover:bg-white rounded-lg hover:text-black hover:p-1 text-xl'
            >
              Product
            </Link>
            <Link href="/about" className='text-white hover:bg-white rounded-lg hover:text-black hover:p-1 text-xl'>About Us</Link>
            <Link href="/contact" className='text-white hover:bg-white rounded-lg hover:text-black hover:p-1 text-xl'>Contact</Link>
          </div>

          <Link href="/cart">
            <div className='text-white text-3xl md:text-4xl '><IoCartOutline />
            </div>
          </Link>
        </div>
        <div className='text-white gap-4 ml-3 mr-3 hidden md:flex items-center'>
          <select name="currency" id="currency">
            <option className='text-black' value="usd">USD</option>
            <option className='text-black' value="eur">EUR</option>
            <option className='text-black' value="pkr">PKR</option>
          </select>
        </div>

        <div className="hidden md:flex mr-2 ">
          <SignedOut>
            <SignInButton>
              <button className="bg-white text-black rounded-full sm:text-base  sm:h-10 sm:px-3 cursor-pointer w-[100px]">
                Sign Up
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        <div className="flex md:hidden mr-2">
          <SignedOut>
            <SignUpButton>
              <button className="bg-white text-black rounded-full  text-[11px]  h-8 px-4 cursor-pointer w-[74px]">
                Sign Up
              </button>
            </SignUpButton>

          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>



        <button onClick={toggleMenu} className='block md:hidden text-white text-3xl mr-3' >

          {isOpen ? <HiOutlineX /> : <HiOutlineMenuAlt2 />}

        </button>
      </div>

      {isOpen && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -70 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -70 }}
            transition={{ type: "spring", stiffness: 100, }}
            onClick={() => setIsOpen(false)} className='md:hidden bg-black pl-5 pr-5 sm:pl-8 pt-8 pb-8 sm:pr-8 text-xl font-semibold space-y-8'>
            <Link href="/" className='block  bg-white text-black px-3 py-2 rounded-md'>Home</Link>
            <Link href={pathname === "/" ? "#product" : "/#product"} className='block bg-white text-black px-3 py-2 rounded-md'>Product</Link>
            <Link href="/about" className='block bg-white text-black px-3 py-2 rounded-md'>About Us</Link>
            <Link href="/contact" className='block bg-white text-black px-3 py-2 rounded-md'>Contact</Link>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}

export default Navbar
