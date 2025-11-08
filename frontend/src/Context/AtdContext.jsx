import { Children, createContext, useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"

export const atdContext = createContext(null)

const AtdContextState = ({ children }) => {
    const [auth, setAuth] = useState("login")
    const [token, setToken] = useState('')
    const navigate = useNavigate()

    const url = "http://localhost:3000";
     const [data, setData] = useState({
         name: '',
         email: '',
         password: ''
     })
     const handleOnChange = (e) => {
         setData({ ...data, [e.target.name]: e.target.value })

    }
    
    //when page refreshed
    useEffect(() => {
        let tokenVal = localStorage.getItem("Token")
        setToken(tokenVal)
    
        
     },[])


     const handleSubmit = async (e) => {
         e.preventDefault()
         if (auth == "login") {
             let newUrl = `${url}/api/user/login`;
             try {

                 const res = await axios.post(newUrl, data)
                 alert(res.data.msg)
                 if (res.data.success) {
                     navigate('/')
                 }
                 let tokenVal = res.data.token;
                 setToken(tokenVal)
                 localStorage.setItem('Token',tokenVal)
    
             } catch (err) {
                 alert(err.response.data.msg)

             }


         } else {
             let newUrl = `${url}/api/user/register`;
             try {

                 const res = await axios.post(newUrl, data)
                 alert(res.data.msg)
                 let tokenVal = res.data.token;
                 if (res.data.success) {
                     navigate('/')
                 }
                 setToken(tokenVal)
                 localStorage.setItem('Token', tokenVal)


             } catch (err) {
                 alert(err.response.data.msg)

             }
         }


     }
    let contextValue = {
        handleOnChange,
        handleSubmit,
        data,
        auth, setAuth,
        token,
        url
    }

     return (
         <atdContext.Provider value={contextValue}>{children}</atdContext.Provider>   
    ) 
}

export default AtdContextState