import React, { useState, useEffect, useContext } from 'react'
import { FiBell, FiLogOut } from "react-icons/fi"
import { Link, useNavigate } from "react-router-dom"
import { atdContext } from '../Context/AtdContext';
import Username from './Alert';
const Navbar = ({menuRef}) => {
    const [visible, setVisible] = useState(true);
    const navigate = useNavigate()
    let scrollTimeout;
    const { token, setToken,toggle,setToggle,userData,setUserData } = useContext(atdContext)
    const [loading, setLoading] = useState(false)

    const [showOnScroll,setShowOnScroll] = useState(false)
   
    

    const handleLogout = async () => {
        setLoading(true)
        console.log("logout");
        
        await new Promise((resolve) => setTimeout(resolve, 1000))

        localStorage.removeItem("Token")
        setLoading(false)
        window.location.href = "/login"

    }
    useEffect(() => {
        setUserData(userData)
    },[userData])

  
   
    
    return (


<>
        <div className={`fixed  h-[100px] bg-white py-5 px-3 md:py-6 md:px-10 rounded-b-lg  shadow  top-0 right-0 left-0 transition-all duration-300 z-50 border  `}  ref={menuRef}>



            <div className='flex justify-between items-center '>
                <div className='flex flex-col gap-0.5'>
                    <Link to="/" className='font-sans-serif font-bold text-indigo-600 text-[20px] md:text-2xl tracking-wide' >AttendanceTracker</Link>
                    <p className='text-[11px] md:text-[14px] font-semibold text-center text-gray-500 '>Attendance made simple</p>
                </div>

                <div className='flex gap-3 items-center md:gap-4'>
                    <div className='relative'>
                        <FiBell aria-label='Notifications' className='w-7 h-7 md:w-8 md:h-8 cursor-pointer text-gray-500 hover:text-black' />
                        <p className='absolute -top-1 -right-1 bg-red-500 rounded-full text-sm text-white px-1.5'>1</p>
                    </div>
                    <div className=''>
                        {
                            token ?
                                <div>
                                        <Username name={userData?.name } />
                                </div>

                                :
                                <button className='border py-2 px-4 rounded-[10px]  bg-blue-600 text-white font-semibold cursor-pointer
                  hover:bg-blue-500 transition-all md:py-3 md:px-7 md:text-[18px] active:scale-90' onClick={() => navigate('/login')}
                                >Sign In</button>
                        }


                    </div>

                </div>

            </div>

       
               
            </div>
            {/* toggle Button */}
            {toggle &&
                <div className=" px-4 sm:px-6 md:px-10 flex justify-center md:justify-end">
                    <div className={`fixed border w-full max-w-sm md:max-w-[300px] h-auto rounded-2xl shadow-md bg-white z-50  md:top-24 top-20 md:right-2 right-0  `}>

                        {/* Header */}
                        <div className="flex px-3 py-4 gap-3 hover:bg-gray-50 transition">
                            <div className="rounded-full bg-blue-400 w-12 h-12 flex justify-center items-center shadow-md">
                                <p className="text-base font-semibold text-white">A</p>
                            </div>
                            <div>
                                <p className="font-semibold text-sm md:text-base">{userData?.name}</p>
                                <p className="text-gray-600 text-xs md:text-sm">Active now</p>
                            </div>
                        </div>

                        <hr />

                        {/* Email */}
                        <div className="flex flex-col gap-2 px-4 py-4 hover:bg-gray-50 transition">
                            <p className="text-gray-500 text-xs md:text-sm font-semibold">Email</p>
                            <p className="text-sm md:text-base font-semibold">{userData?.email}</p>
                        </div>

                        <hr />

                        {/* Logout */}
                        <div className="px-4 py-4 hover:bg-gray-50 transition cursor-pointer" onClick={() => handleLogout()} >
                          { loading?"Loding...": <button onClick={() => handleLogout()} className="cursor-pointer  font-semibold text-sm md:text-base ">Logout</button>}
                        </div>
                    </div>
                </div>
            }
            
            </>

       
    )
}

export default Navbar
