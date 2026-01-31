import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'

const Product = () => {
  const { productId } = useParams()
  const { products, currency, addToCart, cartItem } = useContext(shopContext)
  const [size, setSize] = useState('')
  const [productData, setproductData] = useState(false)
  const [image, setImage] = useState('')

  const FetchProductData = () => {
    products.map((item) => {
      if (item._id === productId) {
        setproductData(item)
        setImage(item.image[0])
      return null
      }
    })
  }

  useEffect(()=>{
    FetchProductData()
  },[products,productId])

  useEffect(() => {
   console.log((cartItem))
  }, [cartItem])

  return productData ? (
    <div className="border py-10 px-16"> {/* space from sides */}
      <div className="flex gap-12 items-start">

        {/* THUMBNAILS */}
        <div className="flex flex-col gap-3 w-[12%]">
          {productData.image.map((item, index) => (
            <img
              key={index}
              src={item}
              alt=""
              onClick={() => setImage(item)}
              className={`
                cursor-pointer rounded-md border
                hover:border-black transition
                ${image === item ? 'border-black' : 'border-gray-300'}
                max-w-[80px]
              `}
            />
          ))}
        </div>

        {/* MAIN IMAGE */}
        <div className="flex-1 flex justify-center bg-gray-50 rounded-lg p-6">
          <img
            src={image}
            alt=""
            className="w-full max-w-[420px] object-contain rounded-lg"
          />
        </div>
        {/* product info */}
        <div className='flex-1'>
          <p className='font-medium text-2xl mt-2'>{productData.name}</p>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star} alt="" className='w-5 3' />
            <img src={assets.star} alt="" className='w-5 3' />
            <img src={assets.star} alt="" className='w-5 3' />
            <img src={assets.star} alt="" className='w-5 3' />
            <img src={assets.star} alt="" className='w-5 3' />
            <img src={assets.star} alt="" className='w-5 3' />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className=' flex flex-col gap-4 my-8'>
            <p>Select size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button onClick={() => setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-gray-800' : ''}`} key={index}>{item}</button>
              ))}
            </div>
          </div >
          <button onClick={() => addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 flex flex-col gap-1 mt-5'>
            <p>100% Original Products.</p>
            <p>Cash on delivery is available on this products.</p>
            <p>Easy return and exhange within 7 days policy.</p>
          </div>
        </div>
      </div>
      {/* descrption & review section */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>reviews(122)</p>
        </div>
        <div className='flex flex-col gap-4 px-6 py-6 text-sm text-gray-500'>
          <p>an Ecommerce</p>
        </div>
      </div>
      {/* Related products */}
      <RelatedProducts category={productData.category} />
    </div>
  ) : null
}

export default Product
