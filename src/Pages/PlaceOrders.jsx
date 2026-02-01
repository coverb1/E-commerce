import React from 'react'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'

const PlaceOrders = () => {
  return (

    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]:'>
      {/* Leftside */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          {/* Delivery imformation */}
          <p>DELIVERY IMFORMATION</p>
        </div>
        <div className='flex gap-3'>
          <input type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='First name' />
          <input type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Second name' />
        </div>
        <input type="Email" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Email Adress' />
        <input type="Email" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Street' />
        <div className='flex gap-3'>
          <input type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='City' />
          <input type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Location' />
        </div>
        <div className='flex gap-3'>
          <input type="number" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Zipcode' />
          <input type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Second name' />
        </div>
        <input type="number" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Phone' />
      </div>
      {/* Right side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <p>PAYMENT METHOD</p>
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full`}></p>
              <img className='h-5 mx-4' src={assets.stripelogo} alt="" />
            </div>
            <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full`}></p>
              <img className='h-5 mx-4' src={assets.rezorpay} alt="" />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default PlaceOrders