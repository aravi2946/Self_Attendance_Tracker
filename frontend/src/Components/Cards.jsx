import React from 'react'

const Cards = () => {
    return (
        <div className='mx-2 my-4'>
            <div className='container  py-3.5 flex flex-col gap-3 md:flex-row md:mx-auto md:justify-center md:gap-10 md:py-1'>

                <div className='px-5 py-5  border border-gray-50 rounded-lg flex flex-col gap-2.5 justify-center shadow hover:shadow-sky-50 md:w-[500px] '>
                    <p className='text-[16px] font-semibold text-gray-600 md:text[20px]'>Today's Attendance</p>
                    <div className='flex gap-4 items-center'>
                        <h2 className='text-3xl font-bold md:text-4xl'>50%</h2>
                        <p className='text-[16px] text-gray-500 md:text-[18px] '>5/5</p>
                    </div>
                </div>
                
                <div className='px-5 py-5 border border-gray-50 rounded-lg flex flex-col gap-2.5 justify-center shadow hover:shadow-sky-50 md:w-[500px]'>
                    <p className='text-[16px] font-semibold text-gray-600 md:text[20px]'>Overall Attendance</p>
                    <div className='flex gap-4 items-center'>
                        <h2 className='text-3xl font-bold md:text-4xl'>74%</h2>
                        <p className='text-[16px] text-gray-500 md:text-[18px] '>250/320</p>
                    </div>
                </div>
                
                <div className='px-5 py-5 border border-gray-50 rounded-lg flex flex-col gap-2.5 justify-center shadow hover:shadow-sky-50 md:w-[500px]'>
                    <p className='text-[16px] font-semibold text-gray-600 md:text[20px]'>Attendance Status</p>
                    <div className='flex flex-col gap-2 '>
                        <h2 className='text-3xl font-bold md:text-4xl text-red-500'>Below 75%</h2>
                        <p className='text-[14px] text-gray-500 md:text-[16px] '>You need to attend 7 days to reach 75%</p>
                    </div>
                </div>
                
               
               
            </div>


        </div>
    )
}

export default Cards
