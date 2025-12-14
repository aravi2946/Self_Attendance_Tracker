import { useContext, useState } from "react"
import axios from "axios"
import { atdContext } from "../Context/AtdContext"
import { Toaster } from "sonner"
import { Link } from "react-router-dom"

const Login = () => {


    const { handleOnChange, handleSubmit, data, auth, setAuth,isLoading } = useContext(atdContext)


    return (
        <div className="h-screen flex flex-col gap-5 justify-center items-center bg-gray-100 px-5 ">
            <title>{ auth=="login"?"Login-page":"Signup-page"}</title>
            {/* Container */}
            <Toaster richColors position="top-center" />
            <div className="">
                <Link to="/" className='font-sans-serif font-semibold text-indigo-600 text-[20px] md:text-2xl tracking-wide hover:underline'>AttendanceTracker</Link>
                <p className='text-[11px] md:text-[14px] font-semibold text-center text-gray-500 '>Attendance made simple</p>
            </div>
            <div className="bg-white flex flex-col  md:gap-5  w-full max-w-md py-5 px-10 rounded-lg shadow">
                <h1 className="text-2xl font-semibold text-center md:text-3xl">{auth == "signup" ? "Create Account" : 'Login'}</h1>
                <form className="flex flex-col gap-2.5 py-5 md:gap-5 " onSubmit={handleSubmit}>
                    {
                        auth == "signup" ? <div className="flex flex-col gap-2 justify-center">
                            <label htmlFor="name" className="font-semibold ">Name</label>
                            <input type="text" placeholder="Enter your name" id="name" className="placeholder:text-[13px] md:placeholder:text-[15px] border border-gray-300 px-2 py-2 rounded-lg"
                                onChange={(e) => handleOnChange(e)} name="name" value={data.name} required />
                        </div> : <></>
                    }

                    <div className="flex flex-col gap-2 justify-center">
                        <label htmlFor="email" className="font-semibold ">Email</label>
                        <input type="email" placeholder="Enter your email" id="email" className="placeholder:text-[13px] md:placeholder:text-[15px]  border border-gray-300 px-2 py-2 rounded-lg"
                            onChange={(e) => handleOnChange(e)} name="email" value={data.email} aria-label="Email address" required />
                    </div>
                    <div className="flex flex-col gap-2 justify-center">
                        <label htmlFor="password" className="font-semibold ">Password</label>
                        <input type="password" placeholder="Enter your password" id="password" className="placeholder:text-[13px] md:placeholder:text-[15px] font-normal border border-gray-300 px-2 py-2 rounded-lg"
                            onChange={(e) => handleOnChange(e)} name="password" value={data.password} required
                        />
                    </div>


                    <button type="submit" disabled={isLoading}
                        className={`text-center text-white font-semibold bg-blue-500 py-2 mt-5 rounded-lg text-[16px] hover:bg-blue-600 hover:text-gray-100 transition-all md:text-[18px] ${isLoading ? "bg-blue-300 animate-pulse cursor-not-allowed" :" cursor-pointer"}`} >
                        {isLoading ? <span>Processing...</span>:(auth == "signup" ? "Signup" : "Login")}
                    </button>

                    <div className="flex items-center my-3 ">
                        <div className="grow border-t border-gray-300"></div>
                        <span className="px-3 text-gray-500 flex items-center">or</span>
                        <div className="grow border-t border-gray-300"></div>
                        
                    </div>

                    <p className="text-center text-[16px] font-semibold mb-2" >
                        <span className="text-gray-500 text-[14px]">
                            {auth == "login" ? "Don't have an account?":"Already have an account?"} 
                        </span>
                        <span onClick={() => setAuth(auth == "login" ? "signup" : "login")} className="font-semibold cursor-pointer  hover:underline px-1">{auth=="login"?"Sign up":"Login"}</span>
                       </p>
                </form>



            </div>

        </div>
    )
}

export default Login
