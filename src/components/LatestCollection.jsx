import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../context/shopContext'
import ProductItem from './ProductItem'

const LatestCollection = () => {
  const { products } = useContext(shopContext)
  const[latestProduct,setLatestProduct]=useState([])

useEffect(()=>{
setLatestProduct(products.slice(0,6));
},[])

  return (
    <div>
      <div className='flex  flex-col justify-center items-center mt-5'>
        <p className='text-3xl font-bold'>Latest Collection</p>
        <p className=''>Welcome to our forever store collection</p>
      </div>
      {/* Rendering products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
{latestProduct.map((item,index)=>(
<ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
))}
      </div>
    </div>
  )
}

export default LatestCollection