import {Link, useNavigate} from "react-router-dom"
import Button from "../Components/Button";
import { useState } from "react";
import axios from "axios"

function Register({loading,setLoading}) {

  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [form, setForm] = useState({
    name : "",
    username : "",
    email : "",
    password : ""
  })

  const navigate = useNavigate()

  const handleSubmit = (e)=>{
    e.preventDefault()

    const submitForm = async()=>{
      setLoading(true)
      try {
        const response = await axios.post("http://localhost:3000/api/auth/register",form,{withCredentials:true})
        setError(null)
        setSuccess(response.data.message)
        
        setTimeout(()=>{     
          navigate("/auth/login")
        },2000)

      } catch (error) {
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
    <div className='pt-18'>
      <div className="flex items-center justify-center min-h-[88vh]">
        <form onSubmit={handleSubmit} className='form flex flex-col gap-3 min-w-[90%] justify-around shadow-lg rounded-[10px] bg-[#1a1a1a] py-4 px-2 md:min-w-[60%]'>
        <p className="text-3xl font-bold text-cyan-300">Register</p>
            {/* NAME */}
            <div className='flex flex-col gap-2'>
                <label htmlFor="name" className='font-bold'>Name</label>
                <input type="text" id='name' placeholder='Name...' className='text-white bg-[#2a2a2a] outline-none focus:ring-2 focus:ring-cyan-300 p-2 rounded-[5px]' value={form.name}  onChange={(e)=>{setForm(prevForm => ({...prevForm,name : e.target.value.trim()}))}}/>
            </div>
            
            {/* USERNAME */}
            <div className='flex flex-col gap-2'>
                <label htmlFor="username" className='font-bold'>Username</label>
                <input type="text" id='username' placeholder='Username...' className='text-white bg-[#2a2a2a] outline-none focus:ring-2 focus:ring-cyan-300 p-2 rounded-[5px]' value={form.username}  onChange={(e)=>{setForm(prevForm => ({...prevForm,username : e.target.value.trim()}))}}/>
            </div>
            
            {/* EMAIL */}
            <div className='flex flex-col gap-2'>
                <label htmlFor="email" className='font-bold'>Email</label>
                <input type="text" id='email' placeholder='Email...' className='text-white bg-[#2a2a2a] outline-none focus:ring-2 focus:ring-cyan-300 p-2 rounded-[5px]' value={form.email}  onChange={(e)=>{setForm(prevForm => ({...prevForm,email : e.target.value.trim()}))}}/>
            </div>
            
            {/* PASSWORD */}
            <div className='flex flex-col gap-2'>
                <label htmlFor="pasword" className='font-bold'>Password</label>
                <input type="password" id='password' placeholder='Password...' className='text-white bg-[#2a2a2a] outline-none focus:ring-2 focus:ring-cyan-300 p-2 rounded-[5px]' value={form.password}  onChange={(e)=>{setForm(prevForm => ({...prevForm,password : e.target.value.trim()}))}}/>
            </div>
            <p>Already have an account? <Link to={"/auth/login"}  className="text-cyan-300 font-bold">Login</Link></p>
            <Button loading={loading} buttonText="Register"/>
          {error && error? <div className='p-3 border-l-4 border-red-500 bg-red-200 text-red-700 font-semibold rounded-lg shadow-sm'>{error}!</div>:""}
          {success && success? <div className='p-3 border-l-4 border-green-500 bg-green-200 text-green-700 font-semibold rounded-lg shadow-sm'>{success}!. Redirecting...</div>:""}
        </form>
      </div>
    </div>
  );
}

export default Register;