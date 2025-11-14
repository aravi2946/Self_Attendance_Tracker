import React, { useState, useEffect, useContext } from 'react'
import { FiBell,FiLogOut } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import { atdContext } from '../Context/AtdContext';
const Navbar = () => {
    const [visible, setVisible] = useState(true);
    const navigate = useNavigate()
    let scrollTimeout;
    const { token, setToken } = useContext(atdContext)
    const [loading,setLoading] = useState(false)

    


    const handleLogout = async() => {
        setLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        
        localStorage.removeItem("Token")
        setLoading(false)
        window.location.href = "/login"



    //    let tokenVal= localStorage.removeItem("Token")
    //    window.location.reload() 
        
       
        

    }
    return (



        <div className={`container  sticky h-[100px] max-w-full bg-white py-5 px-3 md:py-6 md:px-10 rounded-b-lg  shadow  top-0 left-0 transition-all duration-300 `}>

            <div className='flex justify-between items-center'>
                <div className='flex flex-col gap-0.5'>
                    <h2 className='font-sans-serif font-bold text-indigo-600 text-[20px] md:text-2xl tracking-wide'>AttendanceTracker</h2>
                    <p className='text-[11px] md:text-[14px] font-semibold text-center text-gray-500 '>Attendance made simple</p>
                </div>

                <div className='flex gap-3 items-center md:gap-4'>
                    <div className='relative'>
                        <FiBell aria-label='Notifications' className='w-7 h-7 md:w-8 md:h-8 cursor-pointer text-gray-500 hover:text-black' />
                        <p className='absolute -top-1 -right-1 bg-red-500 rounded-full text-sm text-white px-1.5'>1</p>
                    </div>
                    <div >
                        {
                            token ? <button
                                className='' onClick={handleLogout}>
                           
                              
                                
                                {
                                    loading ? <div className='w-6 h-6 border border-2-gray-100 border-t-white rounded-full animate-spin'></div> : <>
                                    
                                    <FiLogOut className='text-2xl cursor-pointer text-gray-600 hover:text-black md:hidden' />
    
                                    <div className='cursor-pointer
                                    py-2 px-3 md:px-4 md:py-2.5 text-[16px] md:text-[18px] font-semibold rounded-[10px] shadow bg-red-600 hover:bg-red-500 transition-all text-white hidden md:inline'>
                                        
                                        Logout
                                    </div>
                                    
                                    </>
                              }
                       
                            </button>
                                
                                :
                                <button className='border py-2 px-4 rounded-[10px]  bg-blue-600 text-white font-semibold cursor-pointer
                  hover:bg-blue-500 transition-all md:py-3 md:px-7 md:text-[18px] active:scale-90' onClick={() => navigate('/login')}
                                >Sign In</button>
                        }


                    </div>
                   
                </div>

            </div>

        </div>
    )
}

export default Navbar
