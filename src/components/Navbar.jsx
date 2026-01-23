import React from 'react'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between px-10 py-5 border-b">

            {/* LEFT: Logo */}
            <div className="text-xl font-semibold">
                FOREVER.
            </div>

            {/* CENTER: Menu */}
            <ul className="flex gap-8 text-sm tracking-wide">
                <li>
                    <NavLink to="/" className="hover:underline">
                        HOME
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/collection" className="hover:underline">
                        COLLECTION
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/about" className="hover:underline">
                        ABOUT
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/contact" className="hover:underline">
                        CONTACT
                    </NavLink>
                </li>
            </ul>

            {/* RIGHT: Icons */}
            <div className="flex items-center gap-4">
                <img src={assets.search} alt="" className='w-5' />
                <div className='group relative'>
                    <img src={assets.user} alt="" className='w-5 cursor-pointer' />
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded-sm'>
                            <p className='cursor-pointer hover:text-black'>My Profile</p>
                            <p className='cursor-pointer hover:text-black'>Orders</p>
                            <p className='cursor-pointer hover:text-black'>Logout</p>
                        </div>
                    </div>
                </div>
              <Link to="/cart" className="relative">
  <img
    src={assets.shoppingbag}
    alt="Cart"
    className="w-5 cursor-pointer"
  />

  <span
    className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center
               bg-black text-white rounded-full text-[10px] font-medium"
  >
    10
  </span>
</Link>

            </div>

        </nav>
    )
}

export default Navbar
