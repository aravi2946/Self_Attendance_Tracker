import React from 'react'
import Navbar from '../Components/Navbar'
import Header from '../Components/header'
import PrevAtd from '../Components/PrevAtd'
import Cards from '../Components/Cards'

const Home = ({open,setOpen}) => {
  return (
    <>
     {open?<PrevAtd setOpen={setOpen}/>:<></>}
    <div className="h-screen ">
     
      <div>

          <Navbar />
      </div>
      <div className=''>

          <Header setOpen={setOpen} />
      </div>
      
        <div>
          <Cards/>
        </div>


    </div>
    </>
  )
}

export default Home
