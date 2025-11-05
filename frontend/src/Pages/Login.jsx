import { useContext, useState } from "react"
import axios from "axios"
import { atdContext } from "../Context/AtdContext"

const Login = () => {


    const { handleOnChange,handleSubmit,data,auth,setAuth } = useContext(atdContext)
   


    return (
        <div className="h-screen flex justify-center items-center bg-gray-100 px-5">
            {/* Container */}
            <div className="bg-white flex flex-col  gap-5 w-full max-w-md py-7 px-5 rounded-lg shadow">
                <h1 className="text-2xl font-semibold text-center md:text-3xl">{auth == "signup" ? "Create Account" : 'Login'}</h1>
                <form className="flex flex-col gap-5 py-7">
                    {
                        auth == "signup" ? <div className="flex flex-col gap-2 justify-center">
                            <label htmlFor="name" className="font-semibold ">Name</label>
                            <input type="text" placeholder="Enter your name" id="name" className="border border-gray-300 px-2 py-2 rounded-lg"
                                onChange={(e) => handleOnChange(e)} name="name" value={data.name} />
                        </div> : <></>
                    }

                    <div className="flex flex-col gap-2 justify-center">
                        <label htmlFor="email" className="font-semibold ">Email</label>
                        <input type="email" placeholder="Enter your email" id="email" className="border border-gray-300 px-2 py-2 rounded-lg"
                            onChange={(e) => handleOnChange(e)} name="email" value={data.email} />
                    </div>
                    <div className="flex flex-col gap-2 justify-center">
                        <label htmlFor="password" className="font-semibold ">Password</label>
                        <input type="password" placeholder="Enter your password" id="password" className="border border-gray-300 px-2 py-2 rounded-lg"
                            onChange={(e) => handleOnChange(e)} name="password" value={data.password}
                        />
                    </div>


                    <button type="submit" className="text-center text-white font-semibold bg-blue-500 py-2 mt-5 rounded-lg text-[16px] cursor-pointer hover:bg-blue-600 hover:text-gray-100 transition-all md:text-[18px]" onClick={handleSubmit}>
                        {auth == "signup" ? "Signup" : "Login"}</button>


                    <p className="text-center text-[16px] font-semibold hover:text-blue-400 cursor-pointer " onClick={() => setAuth(auth == "login" ? "signup" : "login")}>{auth == "login" ? "Already have account?" : "Don't have an account?"} </p>
                </form>



            </div>

        </div>
    )
}

export default Login
