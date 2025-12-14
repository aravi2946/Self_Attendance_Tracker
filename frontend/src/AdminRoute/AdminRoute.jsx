import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { atdContext } from "../Context/AtdContext"
import { jwtDecode } from "jwt-decode"



const AdminRoute = ({ children }) => {
    //  const {userData} = useContext(atdContext)
    let token  = localStorage.getItem("Token")
    let userData = jwtDecode(token)
    
    if (!token) {
        return <Navigate to="/login" replace/>
    }
    if (userData && userData.role != "admin") {
        return <Navigate to="/" replace />
            
        
    }
    return children
  
}

export default AdminRoute
