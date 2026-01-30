import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Collection from './Pages/Collection'
import Contact from './Pages/Contact'
import Login from './Pages/Login'
import Order from './Pages/Order'
import Product from './Pages/Product'
import PlaceOrders from './Pages/PlaceOrders'
import Navbar from './components/Navbar'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cart from './Pages/Cart'
import SearchBar from './components/SearchBar'
const App = () => {
  return (
    <div className='px-4 sm:-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar/>
      <SearchBar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/order' element={<Order/>}/>
        <Route path='/product/:productId' element={<Product/>}></Route>
        <Route path='/placeOrders' element={<PlaceOrders/>}/>
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
    </div>
  )
}

export default App