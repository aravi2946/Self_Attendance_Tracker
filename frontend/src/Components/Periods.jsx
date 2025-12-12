import React, { useState } from 'react'
import Data from "./../cardData.json"
import axios from 'axios'
import { useContext } from 'react'
import { atdContext } from '../Context/AtdContext'
import { useEffect } from 'react'
const Periods = () => {
  const { url, fetchData,
    fetchTodaysData } = useContext(atdContext)
  const [btnstatus, setBtnStatus] = useState({})
  const [preLoading, setPreLoading] = useState(null)
  const [abLoading,setAbLoading] = useState(null)


  const periodBtnFun = async (id, status) => {
     if(status)
      setPreLoading(id)
     else
      setAbLoading(id)
    
    
    let date = new Date();
    try {
      let tokenVal = localStorage.getItem('Token')
      let Date = date.toISOString().slice(0, 10)
      const res = await axios.post(`${url}/api/atd/add`, { date: Date, isPresent: status, btnId: id }, { headers: { token: tokenVal } })
      


      if (res.data.success) {
        setBtnStatus(prev => ({ ...prev, [id]: status ? 1 : 2 }))
        // async function loadData() {
        //   await fetchData(tokenVal)
        //   await fetchTodaysData(tokenVal)
        //   await fetchBtnStatus()

        // }
        // await loadData()
        Promise.all([
          fetchData(tokenVal),
          fetchTodaysData(tokenVal),
          fetchBtnStatus()
        ])

      } else {
        
        alert(res?.data?.msg || "Something went wrong");
        console.log(res?.data.msg);
        
      }
 
     

    } catch (err) {
      alert(err?.response?.data.msg||"Something went wrong");
      

    } finally {
      setPreLoading(null)
      setAbLoading(null)
    }



  }

  const fetchBtnStatus = async () => {
    let tokenVal = localStorage.getItem("Token")
    let date = new Date();
    
    try {
      let Date = date.toISOString().slice(0, 10)
      const res = await axios.post(`${url}/api/atd/status`, { date: Date }, { headers: { token: tokenVal } })
      let Status = res?.data?.status;
      if (Status) {
        
        let status = Object.assign({}, ...Status)
        setBtnStatus(status)
      }

    } catch (err) {
      console.log("Something went wrong");

    }
  }
  useEffect(() => {

    fetchBtnStatus()
  }, [])

  return (
    <div className='pb-2 sm:w-full  my-10 '>
      <div className=' flex flex-col gap-2 mx-3  '>

        <div className='text-center md:my-5 '>
          <h2 className=' text-3xl font-semibold font-sans'>Today's Attendance</h2>
        </div>
        <div className='flex  flex-col gap-4 px-3 py-5 text-center md:flex-row md:gap-5 md:flex-wrap'>
          {


            Data.map((val, index) => (

              <div key={index} className='border shadow border-gray-200 py-4 px-2.5 w-100 rounded-lg mx-auto flex flex-col gap-3 sm:w-80 max-sm:w-70'>
                <h2 className='text-[20px] md:text-2xl font-semibold '>{val.period}</h2>
                <p className='text-[16px] font-semibold text-gray-700'>{val.timing}</p>


                <div className='flex flex-row gap-4 justify-center my-2'>
                  <button className={`py-1.5 px-6 rounded-lg bg-green-400 text-white font-semibold shadow cursor-pointer hover:bg-green-500 transition-all active:scale-90`}
                    onClick={() => periodBtnFun(val.id, true)} >
                    {preLoading === val.id ? (<Loader />) :
                      btnstatus[val.id] == 1 ?
                        ("Present ✅"):("Present")
                    }
                  </button>
                  <button className={`py-1.5 px-6 rounded-lg bg-red-500 text-white font-semibold shadow cursor-pointer hover:bg-red-600 transition-all active:scale-90`}
                    onClick={() => periodBtnFun(val.id, false)} >
                    
                    {
                      abLoading == val.id ? (<Loader />) :
                        btnstatus[val.id] == 2?("Absent ❌"):("Absent")
                    }
                  
                  </button>

                </div>


              </div>



            ))
          }

        </div>


      </div>


    </div>
  )
}


function Loader() {
  return (
    <div className='w-5 h-5 rounded-full border border-t-transparent animate-spin'>

    </div>

  )
}

export default Periods



