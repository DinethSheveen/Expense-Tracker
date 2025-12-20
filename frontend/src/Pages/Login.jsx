import {Link, useNavigate} from "react-router-dom"
import Button from "../Components/Button";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Hooks/AuthContextProvider";
import { useEffect } from "react";


function Login({loading,setLoading}) {

  const {state,dispatch} = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(()=>{
    if(state.isAuthenticated){
      navigate("/")
    }   
  },[state.isAuthenticated,navigate])

  const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [form, setForm] = useState({
      username : "",
      password : ""
    })
  
  
    const handleSubmit = async(e)=>{
      e.preventDefault()
  
      setLoading(true)
      try {
        const response = await axios.post("http://localhost:3000/api/auth/login",form,{withCredentials:true})        

        dispatch({type : "LOGIN", payload : response.data.userInfo})          

        setError(null)
        setSuccess(response.data.message)
      } 
      catch (error) {
        setSuccess(null)
        setError(error.response.data.message)
      }
      setLoading(false)
  
      setTimeout(()=>{     
        setSuccess(null)
        setError(null)
      },2000)
    }
  return (
    <div className='pt-20'>
      <div className="flex items-center justify-center min-h-[88vh]">
        <form onSubmit={handleSubmit} className='form flex flex-col gap-5 min-w-[50%] justify-around shadow-lg rounded-[10px] bg-[#1a1a1a] py-4 px-2'>
        <p className="text-3xl font-bold text-cyan-300">Login</p>            
            {/* USERNAME */}
            <div className='flex flex-col gap-2'>
                <label htmlFor="username" className='font-bold'>Username</label>
                <input type="text" id='username' placeholder='Username...' className='text-white bg-[#2a2a2a] outline-none focus:ring-2 focus:ring-cyan-300 p-2 rounded-[5px]'value={form.username} onChange={(e)=>{setForm(prevForm => ({...prevForm,username : e.target.value.trim()}))}}/>
            </div>
            
            {/* PASSWORD */}
            <div className='flex flex-col gap-2'>
                <label htmlFor="password" className='font-bold'>Password</label>
                <input type="password" id='password' placeholder='Password...' className='text-white bg-[#2a2a2a] outline-none focus:ring-2 focus:ring-cyan-300 p-2 rounded-[5px]'value={form.password} onChange={(e)=>{setForm(prevForm => ({...prevForm,password : e.target.value.trim()}))}}/>
            </div>
            <p>Do not have an account? <Link to={"/auth/register"}  className="text-cyan-300 font-bold">Register</Link></p>

            <Button loading={loading} buttonText="Login"/>
            {error && error? <div className='p-3 border-l-4 border-red-500 bg-red-200 text-red-700 font-semibold rounded-lg shadow-sm'>{error}!</div>:""}
            {success && success? <div className='p-3 border-l-4 border-green-500 bg-green-200 text-green-700 font-semibold rounded-lg shadow-sm'>{success}!. Redirecting...</div>:""}
        </form>
      </div>
    </div>
  );
}

export default Login;