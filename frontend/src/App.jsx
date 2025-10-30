
import {Routes,Route} from "react-router-dom"
import Home from "./Pages/Home";
import { useState } from "react";
function App() {
  const [open, setOpen] = useState(false)
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home open={open} setOpen={setOpen} />} />
      </Routes>
    </div>


  )
}

export default App;