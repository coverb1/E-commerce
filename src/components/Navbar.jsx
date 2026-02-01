import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { shopContext } from '../context/ShopContext'

const Navbar = () => {

    const [visible, setvisible] = useState(false)
    const { showSearch, setshowSearch, getCartCount } = useContext(shopContext)

    return (
        <div>
            <nav className="flex items-center justify-between px-10 py-5 border-b">

                {/* LEFT: Logo */}
                <NavLink to='/'>
                    <div className="text-xl font-semibold">
                        FOREVER.
                    </div>
                </NavLink>
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
                    <img onClick={() => setshowSearch(true)} src={assets.search} alt="" className='w-5 cursor-pointer' />
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

                    {/* counting Icon navbar */}

                    <Link to="/cart" className="relative">
                        <img
                            src={assets.shoppingbag} alt="Cart" className="w-5 cursor-pointer" />

                        <span
                            className="absolute -top-2 -right-2 w-4 h-4 flex items-center 
    justify-center bg-black text-white rounded-full text-[10px] font-medium">{getCartCount()}
                        </span>
                    </Link>
                    <img onClick={() => setvisible(true)} src={assets.menu} alt="" className='w-5 cursor-pointer sm:hidden ' />
                </div>
                {/* sidebar menu for small screen */}
                <div className={`absolute  top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                    <div className='flex flex-col text-gray-500'>
                        <div onClick={() => setvisible(false)} className='flex  items-center gap-4 p-3'>
                            <img src={assets.downarrow} alt="" className='h-4 rotate-180' />
                        </div>
                        <NavLink onClick={() => setvisible(false)} className='py pl-6 border' to='/'>Home</NavLink>
                        <NavLink onClick={() => setvisible(false)} className='py pl-6 border' to='/collection'>Collection</NavLink>
                        <NavLink onClick={() => setvisible(false)} className='py pl-6 border' to='/about'>About</NavLink>
                        <NavLink onClick={() => setvisible(false)} className='py pl-6 border' to='/contact'>Contact</NavLink>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
