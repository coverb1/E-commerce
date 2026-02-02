import React, { useContext } from 'react'
import { shopContext } from '../context/ShopContext'

const Order = () => {

  const { products, currency } = useContext(shopContext)

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <p>MY ORDERS</p>
      </div>

      <div>
        {products.slice(1, 5).map((item, index) => (
          <div key={index} className=' flex py-4 border-t border-b text-gray-700 flex-col md:flex-row
 md:items-center md:justify-between gap-4'>
            <div className='flex items-start gap-6 text-sm'>
              <img className='w-16 sm:20' src={item.image[0]} alt="" />
              <div>
                <p className='sm:text-base font-medium'>{item.name}</p>
                <div className='flex items-center gap-3 mt-2 text-base text-gray-400'>
                  <p className='text-lg'>{currency}{item.price}</p>
                  <p>Quality:1</p>
                  <p>Size:M</p>
                </div>
                <p className='mt-2'>Date:<span className='text-gray-400'>25,jul,2025</span></p>
              </div>
            </div>
            <div className='md:w-1/2 flex justify-between'>
<div className='flex items-center gap-2'>
<p className='min-w-2 h-2 rounded-full bg-green-500'></p>
<p className='text-sm md:text-base'>Ready To Ship</p>
</div>
<button className='border px-4 text-sm font-medium rounded-sm'>Track Order</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Order