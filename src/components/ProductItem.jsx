import React, { useContext } from 'react'
import { shopContext } from '../context/shopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(shopContext)
    return (
        <Link className='text-gray-700 flex flex-col items-center ' to={`/product/${id}`}>
            <div className='overflow-hidden flex justify-center items-center mt-10'>
                <img className='hover:scale-100 transition ease-in-out w-52 h-72' src={image} alt="" />
            </div>
            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className='text-sm font-medium'>{currency}{price}</p>
        </Link>
    )
}

export default ProductItem