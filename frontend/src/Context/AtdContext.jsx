import { Children, createContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import { toast, Toaster } from "sonner";
// import jwtDecode from "jwt-decode"
import {jwtDecode} from "jwt-decode";
export const atdContext = createContext(null)


const AtdContextState = ({ children }) => {
    const [auth, setAuth] = useState("login")
    const [token, setToken] = useState('')
    const [btnstatus, setBtnStatus] = useState({})
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

    //fetching attendance Data
     const [atdData, setAtdData] = useState({
            periods: '',
            presents: '',
            result: '',
    
     })
     const [tData, setTData] = useState({
            presents: '',
            periods: ''
        })
    const fetchData = async (tokenVal) => {

        try {
            const res = await axios.get(`${url}/api/atd`, {
                headers: {
                    token: tokenVal

                }
            })

            let total = res?.data
            
            
            setAtdData(total)

        } catch (err) {
            console.log(err);

        }
    }

    // let todays;

    const fetchTodaysData = async (tokenVal) => {
        let date = new Date()
        let todays;
        try {
            let todaysDate = date.toISOString().slice(0, 10)
            const res = await axios.post(`${url}/api/atd/today`, { date: todaysDate }, { headers: { token: tokenVal } })

            todays = res.data.dailydata;
            const result = Number(((todays?.presents / todays?.periods) * 100).toFixed(2))
            if (result > 0) {

                todays["result"] = result;
            }

            setTData(todays)

        } catch (err) {
            console.log(err.message||"Something went wrong");

        }
    }

     const fetchBtnStatus = async () => {
        let tokenVal = localStorage.getItem("Token")
        let date = new Date();
        
        try {
          let Date = date.toISOString().slice(0, 10)
          const res = await axios.post(`${url}/api/atd/status`, { date: Date }, { headers: { token: tokenVal } })
          let Status = res?.data?.status;
          if (Status) {
            
            let status = Object.assign({}, ...Status)
            setBtnStatus(status)
          }
    
        } catch (err) {
          console.log("Something went wrong");
    
        }
      }


    //decode the token
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        role:""
    })
    const DecodeToken = (token) => {
        const decode = jwtDecode(token)
        
        const name = decode.name
        const email = decode.email
        const role = decode.role
        
        setUserData({name,email,role})
 
    }
   
    //when page refreshed

    useEffect(() => {
        let tokenVal = localStorage.getItem("Token")
        if (tokenVal) {
            setToken(tokenVal)
            fetchData(tokenVal)
            fetchTodaysData(tokenVal)
            DecodeToken(tokenVal)
            fetchBtnStatus()
            
        }
        else
          setToken("")
    
        
     },[])


    //login functions
    
    const [isLoading, setIsLoading] = useState(false)
    const handleSubmit = async (e) => {
         
        setIsLoading(true)
         e.preventDefault()
         if (auth == "login") {
             let newUrl = `${url}/api/user/login`;
             try {
                 const res = await axios.post(newUrl, data)
                 
                 setIsLoading(false)
                 toast.success(res.data.msg)
                
                 setTimeout(() => {
                     
                     if (res.data.success) {
                         navigate('/')
                     }
                 },1000)
                 let tokenVal = res.data.token;
                 DecodeToken(tokenVal)
                 setToken(tokenVal)
                 localStorage.setItem('Token',tokenVal)
    
             } catch (err) {
                 setIsLoading(false)
                 toast.error(err.response.data.msg)

             }


         } else {
             let newUrl = `${url}/api/user/register`;
             try {

                 const res = await axios.post(newUrl, data)
                 toast.success(res.data.msg)
                 let tokenVal = res.data.token;
                 setTimeout(() => {
                     
                     if (res.data.success) {
                         navigate('/')
                     }
                 }, 1000)
                 DecodeToken(tokenVal)
                 setToken(tokenVal)
                 localStorage.setItem('Token', tokenVal)


             } catch (err) {
                 setIsLoading(false)
                 toast.error(err.response.data.msg)

             }
         }


    }
    //for login to continue
    const [loginTo,setLoginTo] = useState("")

    //toggle button
        const [toggle, setToggle] = useState(false);

    
  

    
    
    
    let contextValue = {
        handleOnChange,
        handleSubmit,
        data,
        auth, setAuth,
        token,
        url,
        fetchData,
        fetchTodaysData,
        atdData,
        setAtdData,
        tData,
        setTData,
        isLoading,
        loginTo,
        setLoginTo,
        toggle,
        setToggle,
        userData,
        setUserData,
        fetchBtnStatus,
        btnstatus,
        setBtnStatus
        
    }

     return (
         <atdContext.Provider value={contextValue}>{children}</atdContext.Provider>   
    ) 
}

export default AtdContextState