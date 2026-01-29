import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shopContext } from '../context/shopContext'

const Product = () => {
  const { productId } = useParams()
  const { products } = useContext(shopContext)

  const [productData, setproductData] = useState(false)
  const [image, setImage] = useState('')

  const FetchProductData = () => {
    products.map((item) => {
      if (item._id === productId) {
        setproductData(item)
        setImage(item.image[0])
      }
    })
  }

  useEffect(() => {
    FetchProductData()
  }, [productId])

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

      </div>
    </div>
  ) : null
}

export default Product
