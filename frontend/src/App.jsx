
import { Routes, Route } from "react-router-dom"
import Home from "./Pages/Home";
import { useState } from "react";
import Login from "./Pages/Login";
import AdminRoute from "./AdminRoute/AdminRoute";
import UsersList from "./Pages/usersList";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
function App() {
  const [open, setOpen] = useState(false)


  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home open={open} setOpen={setOpen} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/usersList"
          element={

            <ProtectedRoute>
              <AdminRoute>

              <UsersList />
              </AdminRoute>
            </ProtectedRoute>
          } />

        <Route path="*" element={"Page Not Found"} />
      </Routes>
    </div>


  )
}

export default App;