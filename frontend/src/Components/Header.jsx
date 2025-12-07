import { useContext, useEffect, useState } from "react";
import { atdContext } from "../Context/AtdContext";

const Header = ({ setOpen,menuRef }) => {
    // const {menuRef} = useContext(atdContext)
    const [timing, setTiming] = useState({
        date: '',
        year: '',
        month: '',
        time: ''
    })

    const dateFormatFun = () => {
        const dateFun = new Date()
        let yr = dateFun.getFullYear();
        let dt = dateFun.getDate();
        let mn = dateFun.toLocaleString('default', { month: 'short' })
        let tm = dateFun.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        })
        setTiming({ date: dt, year: yr, month: mn, time: tm })
    }

    useEffect(() => {
        dateFormatFun();
        const timeInterval = setInterval(dateFormatFun, 60000)
        return () => clearInterval(timeInterval)
    }, [])

    return (
        <div className='w-full  py-6 px-3 md:py-10 md:px-10  bg-white border-b border-gray-200 mb-6' ref={menuRef}>
            {/* // <div className="w-full border "> */}
            <div className='max-w-7xl flex justify-between items-center flex-col gap-5 md:flex-row md:gap-0'>
                {/* <div className="w-1/2 mx-auto"> */}
                <div className='flex flex-col gap-2.5 items-center md:items-start md:gap-3'>
                    <h2 className='text-2xl md:text-[30px] font-bold font-sans text-gray-800'>
                        Attendance Dashboard
                    </h2>

                    <p className='font-semibold text-[16px] md:text-[19px] text-blue-600'>
                        {timing.year} {timing.month} {timing.date}, {timing.time}
                    </p>
                  
                </div>
                <div>
                    <button type="button"
                        onClick={() => setOpen(prev => !prev)}
                        className='py-2.5 overflow-hidden inline-flex justify-center items-center md:py-4 px-4 md:px-6 font-semibold cursor-pointer transform-gpu text-base md:text-[18px] rounded-[10px] border border-gray-300 transition-all active:scale-90 shadow hover:bg-gray-50'
                        
                    >
                        Add Previous Attendance
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header