import React from 'react'
import Navbar from '../Components/Navbar'
import PrevAtd from '../Components/PrevAtd'
import Cards from '../Components/Cards'
import Periods from '../Components/Periods'
import Header from '../Components/Header'

const Home = ({ open, setOpen }) => {
  return (
    <>
      {open ? <PrevAtd setOpen={setOpen} /> : <></>}
      <div className="h-screen ">

        <div>

          <Navbar />
        </div>
        <div className=''>

          <Header setOpen={setOpen} />
        </div>

        <div>
          <Cards />
        </div>

        <div>
          <Periods />
        </div>
        


      </div>
    </>
  )
}

export default Home
