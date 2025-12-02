import React from 'react'
import Navbar from '../Components/Navbar'
import PrevAtd from '../Components/PrevAtd'
import Cards from '../Components/Cards'
import Periods from '../Components/Periods'
import Header from '../Components/Header'

const Home = ({ open, setOpen }) => {
  return (
    <>
      {open && <PrevAtd setOpen={setOpen} />}

      <Navbar />

      <div className="mt-[120px]">
        <Header setOpen={setOpen} />

        <div className="px-3 md:px-10 space-y-6">
          <Cards />
          <Periods />
        </div>
      </div>
    </>
  )
}

export default Home