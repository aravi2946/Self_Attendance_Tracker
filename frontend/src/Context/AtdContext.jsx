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

    let todays;

    const fetchTodaysData = async (tokenVal) => {
        let date = new Date()

        try {
            let Date = date.toISOString().slice(0, 10)
            const res = await axios.post(`${url}/api/atd/today`, { date: Date }, { headers: { token: tokenVal } })

            todays = res.data.dailydata;
            const result = ((todays?.presents / todays?.periods) * 100).toFixed(2)
            if (result > 0) {

                todays["result"] = result;
            }

            setTData(todays)

        } catch (err) {
            console.log(err);

        }
    }


    
    //when page refreshed
    useEffect(() => {
        let tokenVal = localStorage.getItem("Token")
        if (tokenVal) {
            setToken(tokenVal)
            fetchData(tokenVal)
            fetchTodaysData(tokenVal)
        }
        else
          setToken("")
    
        
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
        url,
        fetchData,
        fetchTodaysData,
        atdData,
        setAtdData,
        tData,
        setTData
    }

     return (
         <atdContext.Provider value={contextValue}>{children}</atdContext.Provider>   
    ) 
}

export default AtdContextState