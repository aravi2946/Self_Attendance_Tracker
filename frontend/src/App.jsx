
import {Routes,Route} from "react-router-dom"
import Home from "./Pages/Home";
import { useState } from "react";
import Login from "./Pages/Login";
function App() {
  const [open, setOpen] = useState(false)
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home open={open} setOpen={setOpen} />} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </div>


  )
}

export default App;