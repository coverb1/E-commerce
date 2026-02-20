import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
const Login = ({setToken}) => {

const [email,setEmail]=useState('')
const [password,setPassword]=useState('')

const onSubmitHandler=async(e)=>{
  try {
    e.preventDefault()
   const responce=await axios.post(backendUrl + '/api/user/loginadmin',{email,password})
   if (responce.data.success) {
    setToken(responce.data.token)
   }
   else{
    toast.error(responce.data.message)
   }
   console.log(responce)
  } catch (error) {
    console.log(error)
    toast.error(error)
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <div className="bg-white shadow-xl rounded-xl px-8 py-10 w-full max-w-md">
        
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Admin Panel
        </h1>

        <form onSubmit={onSubmitHandler} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input onChange={(e)=>setEmail(e.target.value)}
              type="email"
              placeholder="your@gmail.com"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none "
           
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input onChange={(e)=>setPassword(e.target.value)}
              type="password"
              placeholder="Enter password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none  "
            
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg font-medium transition duration-200"
          >
            Login
          </button>

        </form>
      </div>

    </div>
  )
}

export default Login
