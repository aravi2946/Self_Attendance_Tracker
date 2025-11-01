import React from 'react'

const PrevAtd = ({setOpen}) => {
  return (
      <div className='absolute z-1 w-screen  h-screen bg-[#00000090] flex items-center '>
          <div className='w-screen border border-gray-300 rounded-lg mt-10 mx-10 py-6 px-6 md:py-8 md:px-8 bg-white md:w-[500px] md:mx-auto '>
              <div className='flex flex-col gap-4 md:gap-6'>
                  <div className='flex flex-col gap-6 md:gap-8'>
                      <input type="text" placeholder='No.of Periods eg.20' className='border border-gray-400 py-2 px-2 md:py-3.5 md:px-3.5 rounded-[5px] text-[14px] md:text-[16px]' />
                      <input type="text" placeholder='No.of Presents eg.20' className='border border-gray-400 py-2 px-2 md:py-3.5 md:px-3.5 rounded-[5px] text-[14px] md:text-[16px]' />
                  </div>
                  <div className='flex gap-5 pt-3'>
                      <button className='cursor-pointer py-2 px-3 rounded-[10px] bg-red-400 text-white
                            font-semibold
                             md:py-3 md:px-4.5 active:scale-90 hover:bg-red-500 transition-all md:text-[18px] shadow-2xl' onClick={() => setOpen(false)}>Cancel</button>
                      <button className='cursor-pointer py-2 px-5 rounded-[10px] bg-blue-400 text-white
                            font-semibold
                             md:py-3 md:px-7 active:scale-90 hover:bg-blue-500 transition-all md:text-[18px] shadow-2xl '>Save</button>
                  </div>
              </div>
          </div>

      
    </div>
  )
}

export default PrevAtd
