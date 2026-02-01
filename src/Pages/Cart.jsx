import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'

const Cart = () => {
  const { products, currency, cartItem, updateQuantity } = useContext(shopContext)
  const [cartData, setCartData] = useState([])

  useEffect(() => {
    const tempData = []
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
    <div className="border-t pt-14 px-4 sm:px-10">
      <div className="text-2xl mb-3">
        <p>YOUR CART</p>
      </div>

      <div>
        {cartData.map((item, index) => {
          const ProductData = products.find(
            (product) => product._id === item._id
          )

          if (!ProductData) return null

          return (
            <div
              key={index}
              className="flex items-center justify-between py-4 border-t border-b text-gray-700"
            >
              {/* LEFT: image + name */}
              <div className="flex items-center gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={ProductData.image[0]}
                  alt=""
                />

                <div>
                  <p className="text-sm sm:text-lg font-medium">
                    {ProductData.name}
                  </p>

                  {/* MIDDLE: price + size */}
                  <div className="flex items-center gap-5 mt-2">
                    <p className="font-bold">
                      {currency}{ProductData.price}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT: quantity */}
              <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null:updateQuantity(item._id,item.size,Number(e.target.value))} className="border w-12 sm:w-16 text-center px-1 py-1" type="number" min={1}
                defaultValue={item.quantity} />
              <img onClick={() => updateQuantity(item._id, item.size, 0)} src={assets.deleteIcon} className='w-4 mr-5 sm:w-5 cursor-pointer' alt="" />
            </div>
          )
        })}
      </div>

<div className='flex justify-end my-20'>
<div className='w-full sm:w-[450px]'>
<CartTotal/>
</div>
</div>

    </div>
  )
}

export default Cart
