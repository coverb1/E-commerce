import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
    return (
        <div className='w-[18%] min-h-screen border-r-2'>
            <div className='flex flex-col gap-4 pt-4 pl-[20%] text-[15px]'>

                <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-r-l" to='/add'>
                    <img className='w-5 h-5' src={assets.add} alt="" />
                    <p className='hidden md:block'>Add</p>
                </NavLink>


    <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-r-l" to='/list'>
                    <img className='w-5 h-5' src={assets.add} alt="" />
                    <p className='hidden md:block'>List item</p>
                </NavLink>

    <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-r-l" to='/order'>
                    <img className='w-5 h-5' src={assets.shoppingcart} alt="" />
                    <p className='hidden md:block'>Order</p>
                </NavLink>

            </div>
        </div>
    )
}

export default Sidebar