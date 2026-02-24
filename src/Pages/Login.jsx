import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [currentstate, setCurrentState] = useState('Sign Up')
  const { token, setToken, backendUrl, navigate } = useContext(shopContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      if (currentstate === 'Login') {
        const responce = await axios.post(backendUrl + '/api/user/loginuser', {
          email,
          password
        })

        if (responce.data.success) {
          setToken(responce.data.token)
          localStorage.setItem('token', responce.data.token)
          // console.log(responce.data.success)
          toast.success(responce.data.message)
          setEmail('')
          setPassword('')
        }
        else {
          toast.error(responce.data.message)
        }
      }
      else {
        const responceRegister = await axios.post(backendUrl + '/api/user/register', {
          name,
          email,
          password
        })
        console.log(responceRegister.data.success)
        toast.success(responceRegister.data.success)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }



  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-5 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentstate}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentstate === 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' />}
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' />
      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='password' />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your password?</p>
        {
          currentstate === 'Login'
            ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p>
            : <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentstate === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login