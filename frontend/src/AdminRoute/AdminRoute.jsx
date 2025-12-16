import { Navigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"



const AdminRoute = ({ children }) => {
  
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
