import React, { useContext, useEffect, useRef, useState } from 'react'
import Navbar from '../Components/Navbar'
import PrevAtd from '../Components/PrevAtd'
import Cards from '../Components/Cards'
import Periods from '../Components/Periods'
import Header from '../Components/Header'
import { motion } from "framer-motion"
import { atdContext } from '../Context/AtdContext'


const Home = ({ open, setOpen }) => {
const {setToggle,toggle} = useContext(atdContext)

 

 
  return (
    <div >
      {open && <PrevAtd setOpen={setOpen} />}
      <Navbar  />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="mt-[120px]" >
        <Header setOpen={setOpen} />

        <div className="px-3 md:px-10 space-y-6">
          <Cards />

          <Periods  />
        </div>
      </motion.div>
      
    </div>
  )
}

export default Home