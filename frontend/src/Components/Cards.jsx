import React, { useContext, useEffect, useState } from 'react'
import { atdContext } from '../Context/AtdContext'
import axios from 'axios'

const Cards = () => {

    const { url } = useContext(atdContext)
    let todays;
    const [data, setData] = useState({
        periods: '',
        presents: '',
        result: '',

    })
    const [tData, setTData] = useState({
        presents: '',
        periods: ''
    })

    const fetchData = async (tokenVal) => {

        try {
            const res = await axios.get(`${url}/api/atd`, {
                headers: {
                    token: tokenVal

                }
            })

            let total = res?.data
            setData(total)

        } catch (err) {
            console.log(err);

        }
    }

    const fetchTodaysData = async (tokenVal) => {
        let date = new Date()

        try {
            let Date = date.toISOString().slice(0, 10)
            const res = await axios.post(`${url}/api/atd/today`, { date: Date }, { headers: { token: tokenVal } })

            todays = res.data.dailydata;
            const result = ((todays?.presents / todays?.periods) * 100).toFixed(2)
            if (result > 0) {

                todays["result"] = result;
            }

            setTData(todays)

        } catch (err) {
            console.log(err);

        }
    }

    const resetBtn = async (e) => {
        e.preventDefault()
        let tokenVal = localStorage.getItem('Token')
        try {
            const confirm = window.confirm("Are you sure you want to reset attendance?")
            if (!confirm) return;

            const res = await axios.put(`${url}/api/atd/reset`, {}, { headers: { token: tokenVal } })

            if (res.data.success) {
                window.location.reload()
            }


        } catch (err) {
            console.log(err.response);

        }
    }

    const Days = () => {

        let t = data.periods
        let p = data.presents
        let x = Math.ceil(((0.75) * (t) - p) / 1.75)
        return x;


    }


    useEffect(() => {
        Days()
        let tokenVal = localStorage.getItem("Token")
        const fetchAllData = async () => {

            if (tokenVal) {
                await fetchData(tokenVal)
                await fetchTodaysData(tokenVal)

            }
        }
        fetchAllData();
    }, [])



    return (
        <div className='mx-2 my-4'>
            <div className='container  py-3.5 flex flex-col gap-3 md:flex-row md:mx-auto md:justify-center md:gap-10 md:py-1'>

                <div className='px-5 py-5  border border-gray-50 rounded-lg flex flex-col gap-2.5 justify-center shadow hover:shadow-sky-50 md:w-[500px] '>
                    <p className='text-[16px] font-semibold text-gray-600 md:text[20px]'>Today's Attendance</p>
                    <div className='flex gap-4 items-center'>
                        <h2 className='text-3xl font-bold md:text-4xl'>{tData?.result || 0}%</h2>
                        <p className='text-[16px] text-gray-500 md:text-[18px] '>
                            {tData?.presents || 0}/{tData?.periods || 0}</p>
                    </div>
                </div>

                <div className='px-5 py-5 border border-gray-50 rounded-lg flex flex-col gap-2.5 justify-center shadow hover:shadow-sky-50 md:w-[500px]'>
                    <div className='flex justify-between items-center'>
                        <p className='text-[16px] font-semibold text-gray-600 md:text[20px]'>Overall Attendance</p>

                        <button className='border border-gray-200 shadow px-1.5 py-1 rounded-lg cursor-pointer hover:bg-gray-50 active:bg-gray-200' onClick={resetBtn}>Reset</button>

                    </div>
                    <div className='flex gap-4 items-center'>
                        <h2 className='text-3xl font-bold md:text-4xl'>{data?.result || 0}%</h2>
                        <p className='text-[16px] text-gray-500 md:text-[18px] '>{data?.presents}/{data?.periods}</p>
                    </div>
                </div>

                <div className='px-5 py-5 border border-gray-50 rounded-lg flex flex-col gap-2.5 justify-center shadow hover:shadow-sky-50 md:w-[500px]'>
                    <p className='text-[16px] font-semibold text-gray-600 md:text[20px]'>Attendance Status</p>
                    <div className='flex flex-col gap-2 '>
                        {
                            data?.result < 75 ?
                                <>

                                    <h2 className='text-3xl font-bold md:text-4xl text-red-500'>Below 75%</h2>
                                    <p className='text-[14px] text-gray-500 md:text-[16px] '>You need to attend {Days()} days to reach 75%</p>
                                </>
                                :
                                <h2 className='text-3xl font-bold md:text-4xl text-green-500'>Good</h2>
                        }

                    </div>
                </div>



            </div>




        </div>
    )
}

export default Cards
