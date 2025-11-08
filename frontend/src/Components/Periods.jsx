import React, { useState } from 'react'
import Data from "./../cardData.json"
import axios from 'axios'
import { useContext } from 'react'
import { atdContext } from '../Context/AtdContext'
const Periods = () => {
  const { url } = useContext(atdContext)
  const [periodBtn, setPeriodBtn] = useState({})
  const periodBtnFun = async (id, status) => {

    let date = new Date();
    try {
      let tokenVal = localStorage.getItem('Token')
      let Date = date.toISOString().slice(0, 10)
      const res = await axios.post(`${url}/api/atd/add`, { date: Date, isPresent: status }, { headers: { token: tokenVal } })
      if (res.data.success) {
        window.location.reload()
      }
      
      if (!res.data.success)
        alert(res.data.msg);

    } catch (err) {
      alert(err.response.data.msg);

    }

    // setPeriodBtn(prev => {
    //   if (!prev[id]) {
    //     const updated = { ...prev, [id]: status ? 1 : 2 }
    //     return updated;
    //   } else {
    //     const updated = { ...prev }
    //     delete updated[id]
    //     return updated
    //   } 
    // })
    //we have to periodBtn in mongodb 
    // like  ids:{1:1}







  }

  return (
    <div className='pb-2'>
      <div className=' flex flex-col gap-2 mx-3 md:mx-30'>

        <div className='my-5 '>
          <h2 className='text-2xl font-semibold font-sans'>Today's Attendance</h2>
        </div>
        <div className='flex flex-col gap-4 px-3 py-2 text-center md:flex-row md:gap-5 md:flex-wrap'>
          {
            Data.map((val, index) => (
              <div key={index} className='border shadow border-gray-200 py-4 px-2.5 w-100 rounded-lg mx-auto flex flex-col gap-3'>
                <h2 className='text-[20px] md:text-2xl font-semibold '>{val.period}</h2>
                <p className='text-[16px] font-semibold text-gray-700'>{val.timing}</p>
                <div className='flex flex-row gap-4 justify-center my-2'>
                  <button className='py-1.5 px-6 rounded-lg bg-green-500 text-white font-semibold shadow cursor-pointer hover:bg-green-600 transition-all active:scale-90'
                    onClick={() => periodBtnFun(val.id, true)}>{periodBtn[val.id] == 1 ? "Present ✔️" : "Present"}</button>
                  <button className='py-1.5 px-6 rounded-lg bg-red-500 text-white font-semibold shadow cursor-pointer hover:bg-red-600 transition-all active:scale-90'
                    onClick={() => periodBtnFun(val.id, false)}>{periodBtn[val.id] == 2 ? "Absent ❌" : "Absent"}</button>

                </div>
              </div>
            )

            )
          }

        </div>


      </div>


    </div>
  )
}

export default Periods
