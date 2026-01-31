import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../context/ShopContext'

const Cart = () => {
  const { products, currency, cartItem } = useContext(shopContext)
  const [cartData, setCartData] = useState([])

  useEffect(() => {
    const tempData = [];
    for (let items in cartItem) {
      for (let item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItem[items][item]
          })
        }
      }
    }
    setCartData(tempData)
  }, [cartItem])

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <p>YOUR CART</p>
      </div>
      <div>
        {cartData.map((item, index) => {
          const ProductData = products.find((product) => product._id === item._id)
          return (
            <div key={index} className='py-4 border-t border-b text-gray-700 grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center'>
              <div className='flex items-center gap-6'>
                <img className='w-16 sm:w-20' src={ProductData.image[0]} alt="" />
                <div>
                  <p className='text-xl sm:text-lg'>{ProductData.name}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Cart