import React, { useContext, useEffect, useState } from 'react'
import { atdContext } from '../Context/AtdContext'
import axios from 'axios'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const Cards = ({menuRef}) => {

    const { url,
        fetchData,
        fetchTodaysData,
        atdData,
        tData, fetchBtnStatus } = useContext(atdContext)
   
    const [open,setOpen] = useState(false)
   const [isLoading,setIsLoading] = useState(false)
    const resetBtn = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            let tokenVal = localStorage.getItem('Token')
            
            const res = await axios.put(`${url}/api/atd/reset`, {}, { headers: { token: tokenVal } })
          
            
            setIsLoading(false)
            if (res.data.success) {
                fetchBtnStatus()
                fetchData(tokenVal)
                fetchTodaysData(tokenVal)
            }


        } catch (err) {
            console.log(err.response);

        } finally {
            setOpen(false)
            setIsLoading(false)
        }
    }

    const Days = () => {
        let t = atdData.periods
        let p = atdData.presents
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
        <div className='flex justify-center mx-5 ' ref={menuRef}>

            <div className='container  py-3.5  flex max-md:flex-col gap-3 md:flex-row md:mx-auto md:justify-center md:gap-10 md:py-1'>

                <div className='px-5 py-5  border border-gray-50 rounded-lg flex flex-col gap-2.5 justify-center  shadow hover:shadow-sky-50 md:w-[500px] '>
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

                        {/* Shadcn Alert component */}

                        <AlertDialog open={open} onOpenChange={setOpen}>
                            <AlertDialogTrigger asChild>
                                <button className='border border-gray-200 shadow px-1.5 py-1 rounded-lg cursor-pointer hover:bg-gray-50 active:bg-gray-200' >Reset</button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription className="text-[14px]">
                                        You want to reset all the data?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                                    <AlertDialogAction className="cursor-pointer" onClick={resetBtn}>
                                        {isLoading?"Continuing...":"Continue"}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                       

                    </div>
                    <div className='flex gap-4 items-center'>
                        <h2 className='text-3xl font-bold md:text-4xl'>{atdData?.result || 0}%</h2>
                        <p className='text-[16px] text-gray-500 md:text-[18px] '>{atdData?.presents || 0}/{atdData?.periods || 0}</p>
                    </div>
                </div>

                <div className='px-5 py-5 border border-gray-50 rounded-lg flex flex-col gap-2.5 justify-center shadow hover:shadow-sky-50 md:w-[500px] min-w-[200px]'>
                    <p className='text-[16px] font-semibold text-gray-600 md:text[20px]'>Attendance Status</p>
                    <div className='flex flex-col gap-2 '>
                        {
                            atdData?.result < 75 ?
                                <>

                                    <h2 className='text-2xl font-bold md:text-[29px] text-red-500 '>Below 75%</h2>
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
