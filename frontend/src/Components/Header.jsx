import { useEffect, useState } from "react";

const Header = ({ setOpen }) => {
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
        console.log(timing);




    }
    useEffect(() => {

        dateFormatFun();
        const timeInterval = setInterval(dateFormatFun, 60000)
        return () => clearInterval(timeInterval)
    }, [])

    return (
        <div className=' py-3  px-5  md:py-10 '>
            <div className='container  mx-auto flex justify-between items-center max-sm:flex-col max-sm:gap-5'>
                <div className='flex flex-col gap-2.5 items-center md:gap-3'>
                    <h2 className='text-2xl md:text-[30px] md:font-bold  font-semibold font-sans text-gray-800'>Attendance Dashboard</h2>
                    <p className='font-semibold text-[16px] md:text-[19px] text-blue-400'>{timing.year}, {timing.month} {timing.date}, {timing.time}</p>
                </div>
                <div className='cursor-pointer rounded-[10px] bg-purple-500 hover:bg-purple-600 transition-all'
                    onClick={() => setOpen(prev => !prev)}>
                    <button className='py-2.5 md:py-4 px-4 md:px-6  text-white font-semibold cursor-pointer md:text-[18px]'>Add Previous Attendance</button>
                </div>

            </div>









        </div>
    )
}

export default Header
