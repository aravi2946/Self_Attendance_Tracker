import React from 'react'

const Periods = () => {
  return (
    <div className='pb-2'>
      <div className=' flex flex-col gap-2 mx-3 md:mx-30'>

        <div className='my-5 '>
          <h2 className='text-2xl font-semibold font-sans'>Today's Attendance</h2>
        </div>

        <div className='flex flex-col gap-4 px-3 py-2 text-center md:flex-row md:gap-5 md:flex-wrap'>

          <div className='border shadow border-gray-200 py-4 px-2.5 w-100 rounded-lg mx-auto flex flex-col gap-3'>
            <h2 className='text-[20px] md:text-2xl font-semibold '>Period 1</h2>
            <p className='text-[16px] font-semibold text-gray-700'>09:20 AM - 10:10 AM</p>
            <div className='flex flex-row gap-4 justify-center my-2'>
              <button className='py-1.5 px-6 rounded-lg bg-green-500 text-white font-semibold shadow cursor-pointer hover:bg-green-600 transition-all active:scale-90'>Present</button>
              <button className='py-1.5 px-6 rounded-lg bg-red-500 text-white font-semibold shadow cursor-pointer hover:bg-red-600 transition-all active:scale-90'>Absent</button>
              
            </div>
          </div>
          <div className='border shadow border-gray-200 py-4 px-2.5 w-100 rounded-lg mx-auto flex flex-col gap-3'>
            <h2 className='text-[20px] md:text-2xl font-semibold '>Period 2</h2>
            <p className='text-[16px] font-semibold text-gray-700'>
              10:10 AM - 11:00 AM</p>
            <div className='flex flex-row gap-4 justify-center my-2'>
              <button className='py-1.5 px-6 rounded-lg bg-green-500 text-white font-semibold shadow cursor-pointer hover:bg-green-600 transition-all active:scale-90'>Present</button>
              <button className='py-1.5 px-6 rounded-lg bg-red-500 text-white font-semibold shadow cursor-pointer hover:bg-red-600 transition-all active:scale-90'>Absent</button>
              
            </div>
          </div>
          
          <div className='border shadow border-gray-200 py-4 px-2.5 w-100 rounded-lg mx-auto flex flex-col gap-3'>
            <h2 className='text-[20px] md:text-2xl font-semibold '>Period 3</h2>
            <p className='text-[16px] font-semibold text-gray-700'>
              11:20 AM - 12:10 PM</p>
            <div className='flex flex-row gap-4 justify-center my-2'>
              <button className='py-1.5 px-6 rounded-lg bg-green-500 text-white font-semibold shadow cursor-pointer hover:bg-green-600 transition-all active:scale-90'>Present</button>
              <button className='py-1.5 px-6 rounded-lg bg-red-500 text-white font-semibold shadow cursor-pointer hover:bg-red-600 transition-all active:scale-90'>Absent</button>
              
            </div>
          </div>
          <div className='border shadow border-gray-200 py-4 px-2.5 w-100 rounded-lg mx-auto flex flex-col gap-3'>
            <h2 className='text-[20px] md:text-2xl font-semibold '>Period 4</h2>
            <p className='text-[16px] font-semibold text-gray-700'>
              12:10 PM - 01:00 PM</p>
            <div className='flex flex-row gap-4 justify-center my-2'>
              <button className='py-1.5 px-6 rounded-lg bg-green-500 text-white font-semibold shadow cursor-pointer hover:bg-green-600 transition-all active:scale-90'>Present</button>
              <button className='py-1.5 px-6 rounded-lg bg-red-500 text-white font-semibold shadow cursor-pointer hover:bg-red-600 transition-all active:scale-90'>Absent</button>
              
            </div>
          </div>
          <div className='border shadow border-gray-200 py-4 px-2.5 w-100 rounded-lg mx-auto flex flex-col gap-3'>
            <h2 className='text-[20px] md:text-2xl font-semibold '>Period 5</h2>
            <p className='text-[16px] font-semibold text-gray-700'>
               01:50 PM - 02:40 PM</p>
            <div className='flex flex-row gap-4 justify-center my-2'>
              <button className='py-1.5 px-6 rounded-lg bg-green-500 text-white font-semibold shadow cursor-pointer hover:bg-green-600 transition-all active:scale-90'>Present</button>
              <button className='py-1.5 px-6 rounded-lg bg-red-500 text-white font-semibold shadow cursor-pointer hover:bg-red-600 transition-all active:scale-90'>Absent</button>
              
            </div>
          </div>

          <div className='border shadow border-gray-200 py-4 px-2.5 w-100 rounded-lg mx-auto flex flex-col gap-3'>
            <h2 className='text-[20px] md:text-2xl font-semibold '>Period 6</h2>
            <p className='text-[16px] font-semibold text-gray-700'>
              02:40 PM - 03:30 PM</p>
            <div className='flex flex-row gap-4 justify-center my-2'>
              <button className='py-1.5 px-6 rounded-lg bg-green-500 text-white font-semibold shadow cursor-pointer hover:bg-green-600 transition-all active:scale-90'>Present</button>
              <button className='py-1.5 px-6 rounded-lg bg-red-500 text-white font-semibold shadow cursor-pointer hover:bg-red-600 transition-all active:scale-90'>Absent</button>
              
            </div>
          </div>
          <div className='border shadow border-gray-200 py-4 px-2.5 w-100 rounded-lg mx-auto flex flex-col gap-3'>
            <h2 className='text-[20px] md:text-2xl font-semibold '>Period 7</h2>
            <p className='text-[16px] font-semibold text-gray-700'>

              03:30 PM - 04:20 PM</p>
            <div className='flex flex-row gap-4 justify-center my-2'>
              <button className='py-1.5 px-6 rounded-lg bg-green-500 text-white font-semibold shadow cursor-pointer hover:bg-green-600 transition-all active:scale-90'>Present</button>
              <button className='py-1.5 px-6 rounded-lg bg-red-500 text-white font-semibold shadow cursor-pointer hover:bg-red-600 transition-all active:scale-90'>Absent</button>
              
            </div>
          </div>

        </div>
      </div>


    </div>
  )
}

export default Periods
