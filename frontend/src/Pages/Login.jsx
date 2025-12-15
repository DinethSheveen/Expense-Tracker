import {Link, useNavigate} from "react-router-dom"
import Button from "../Components/Button";
import { useState } from "react";
import axios from "axios";


function Login() {
  const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
      username : "",
      password : ""
    })
  
    const navigate = useNavigate()
  
    const handleSubmit = (e)=>{
      e.preventDefault()
  
      const submitForm = async()=>{
        setLoading(true)
        try {
          const response = await axios.post("http://localhost:3000/api/auth/login",{
          username : form.username.trim(),
          password : form.password.trim()
        })
          setError(null)
          setSuccess(response.data.message)
          
          setTimeout(()=>{     
            navigate("/")
          },2000)
    
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
      submitForm()
    }
  return (
    <div className='pt-20'>
      <div className="flex items-center justify-center min-h-[88vh]">
        <form onSubmit={handleSubmit} className='form flex flex-col gap-5 min-w-[50%] justify-around shadow-lg rounded-[10px] bg-[#1a1a1a] py-4 px-2'>
        <p className="text-3xl font-bold text-cyan-300">Login</p>            
            {/* USERNAME */}
            <div className='flex flex-col gap-2'>
                <label htmlFor="username" className='font-bold'>Username</label>
                <input type="text" id='username' placeholder='Username...' className='text-white bg-[#2a2a2a] outline-none focus:ring-2 focus:ring-cyan-300 p-2 rounded-[5px]'value={form.username} onChange={(e)=>{setForm(prevForm => ({...prevForm,username : e.target.value}))}}/>
            </div>
            
            {/* PASSWORD */}
            <div className='flex flex-col gap-2'>
                <label htmlFor="pasword" className='font-bold'>Password</label>
                <input type="password" id='password' placeholder='Password...' className='text-white bg-[#2a2a2a] outline-none focus:ring-2 focus:ring-cyan-300 p-2 rounded-[5px]'value={form.password} onChange={(e)=>{setForm(prevForm => ({...prevForm,password : e.target.value}))}}/>
            </div>
            <p>Do not have an account? <Link to={"/auth/register"}  className="text-cyan-300 font-bold">Register</Link></p>

            <Button loading={loading} buttonText="Login"/>
            {error && error? <div className='bg-red-200 border-red-600 border-2 text-red-600 font-bold py-2 px-4 rounded-[5px]'>{error}!</div>:""}
            {success && success? <div className='bg-green-200 border-green-600 border-2 text-green-600 font-bold py-2 px-4 rounded-[5px]'>{success}!. Redirecting...</div>:""}
        </form>
      </div>
    </div>
  );
}

export default Login;