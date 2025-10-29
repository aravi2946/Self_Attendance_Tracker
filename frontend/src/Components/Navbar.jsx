import React, { useState,useEffect } from 'react'
import {FiBell} from "react-icons/fi"
const Navbar = () => {
    const [visible, setVisible] = useState(true);
    let scrollTimeout;

    useEffect(() => {
        const handleScroll = () => {
            setVisible(false);
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                setVisible(true);
            }, 500); // Show navbar after 200ms of no scroll
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  return (

    //   <div className={`border-gray-300 fixed container shadow p-5 md:p-5 rounded-b-lg max-w-full bg-white top-0 left-0 w-full transition-all duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
   
      <div className={`container  max-w-full bg-white py-5 px-3 md:py-6 md:px-8 rounded-b-lg shadow fixed top-0 left-0 transition-all duration-300 ${visible?'opacity-100':'opacity-0'}`}>
      
      <div className='flex justify-between items-center'>
              <div className='flex flex-col gap-0.5'>
                  <h2 className='font-sans font-bold text-blue-600 text-[18px] md:text-2xl tracking-wide'>AttendanceTracker</h2>
                  <p className='text-[13px] md:text-[14px] font-semibold text-center text-gray-500 '>Attendance made simple</p>
              </div>
              
              <div className='flex gap-2 items-center md:gap-4'>
                  <div className='relative'>
                      <FiBell className='w-7 h-7 md:w-8 md:h-8 cursor-pointer text-gray-700 hover:text-black' />
                      <p className='absolute -top-1 -right-1 bg-red-500 rounded-full text-sm text-white px-1.5'>1</p>
                  </div>
                  <div className='border py-2 px-4 rounded-lg bg-blue-400 text-white font-semibold cursor-pointer
                  hover:bg-blue-500 transition-all md:py-3 md:px-5'>
                      <button className='cursor-pointer'>Sign In</button>
                  </div>
              </div>

        </div>
      
    </div>
  )
}

export default Navbar
