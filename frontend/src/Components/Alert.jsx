import React, { useContext, useEffect, useState } from 'react'
import { atdContext } from '../Context/AtdContext';

const Username = ({name}) => {

    const {setToggle,toggle} = useContext(atdContext)
   

    return (
        <>
            <div>

                <div className='md:hidden border-2 border-gray-200 w-10 h-10  bg-blue-50 hover:bg-blue-100 transition rounded-full flex justify-center items-center shadow active:scale-1.1 cursor-pointer' onClick={() => setToggle(!toggle)} >
                    <p className='font-semibold text-gray-700 hover:text-black cursor-pointer'>{name.charAt(0).toUpperCase()}</p>
                </div>


                <div className="border  rounded-3xl shadow bg-white hidden md:flex"
                    onClick={() => setToggle(!toggle)}>

                    <div className='flex items-center justify-between p-1.5  px-2 '>

                        <div className='cursor-pointer'>

                            <div className=' py-2.5 px-2'>

                                <p className='text-gray-600 hover:text-black font-semibold text-[18px]'>{name}</p>
                            </div>
                        </div>
                        <div className='cursor-pointer'>
                            <svg
                                className={`w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all duration-200 hover:text-black ${toggle ? "rotate-90" : ""}`}
                                fill="none"
                                strokeWidth="2"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>

                    </div>

                </div>
            </div>



           

        </>
    )
}

export default Username
