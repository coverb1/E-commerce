import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../context/shopContext'
import ProductItem from './ProductItem'

const RelatedProducts = ({ category }) => {
  const { products } = useContext(shopContext)
  const [related, setRelated] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      let productscopy = products.slice()
      productscopy = productscopy.filter((item) => category === item.category)
      setRelated(productscopy.slice(0, 5))
    }
  }, [products])

  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'>
        <p>RELATED PRODUCTS</p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5'>
{related.map((item,index)=>(
<ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image}/>
))}
      </div>
    </div>
  )
}

export default RelatedProducts