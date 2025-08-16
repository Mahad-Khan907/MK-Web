"use client"
import React from 'react'
import { Images } from '../../assets/assets'
import Image from 'next/image'

const Section1 = () => {
  return (
    <div className='flex flex-col gap-5 w-full items-center justify-center px-6 sm:px-10 md:px-20 py-10'>

      {/* Heading */}
      <div className='flex flex-col items-center text-center'>
        <h1 className='text-2xl sm:text-3xl md:text-4xl max-w-[90%] md:max-w-full text-purple-600 font-bold'>
          #1 Laptops Wholesale Dealers in Karachi
        </h1>
        <div className="w-56 md:w-[700px] mt-4 md:mb-8 mb-6 h-[3px] bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 rounded-full"></div>
      </div>

      {/* Cards */}
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-8 w-full justify-items-center mt-4 md:mt-10'>

        {/* Card 1 */}
        <div className='flex flex-col gap-3 items-center justify-center border w-32 h-32 sm:w-44 sm:h-44 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-lg border-[#0000006c] p-4'>
          <Image className='w-10 sm:w-14 md:w-16' src={Images.deliveryTruck} alt="" />
          <h1 className='text-[12px] sm:text-xl font-semibold'>Delivery</h1>
          <p className='text-[9px] sm:text-sm'>Pakistan-Wide Delivery</p>
        </div>

        {/* Card 2 */}
        <div className='flex flex-col gap-3 items-center justify-center border w-32 h-32 sm:w-44 sm:h-44 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-lg border-[#0000006c] p-4'>
          <Image className='w-10 sm:w-14 md:w-16' src={Images.thumbUp} alt="" />
          <h1 className='text-[12px] sm:text-[16px] md:text-xl font-bold sm:font-semibold'>99% Customers</h1>
          <p className='text-xs sm:text-sm'>Feedbacks</p>
        </div>

        {/* Card 3 */}
        <div className='flex flex-col gap-3 items-center justify-center border w-32 h-32 sm:w-44 sm:h-44 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-lg border-[#0000006c] p-4'>
          <Image className='w-10 sm:w-14 md:w-16' src={Images.returnImg} alt="" />
          <h1 className='text-[12px] sm:text-xl font-semibold'>15 Days</h1>
          <p className='text-xs sm:text-sm'>Return Policy</p>
        </div>

        {/* Card 4 */}
        <div className='flex flex-col gap-3 items-center justify-center border w-32 h-32 sm:w-44 sm:h-44 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-lg border-[#0000006c] p-4'>
          <Image className='w-10 sm:w-14 md:w-16' src={Images.banknote} alt="" />
          <h1 className='text-[12px] sm:text-xl font-semibold'>Payment</h1>
          <p className='text-xs sm:text-sm'>Secure System</p>
        </div>

        {/* Card 5 */}
        <div className='flex flex-col gap-3 items-center justify-center border w-32 h-32 sm:w-44 sm:h-44 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-lg border-[#0000006c] p-4'>
          <Image className='w-10 sm:w-14 md:w-16' src={Images.bestProducts} alt="" />
          <h1 className='text-[12px] sm:text-xl font-semibold'>Only Best</h1>
          <p className='text-xs sm:text-sm'>Brands</p>
        </div>

      </div>
    </div>
  )
}

export default Section1
