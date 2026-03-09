import React, { useContext, useState } from 'react'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { shopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrders = () => {

const {navigate,backendUrl,token,cartItem,setCartItem,getCartAmount,delivery_fee,products}=useContext(shopContext)

const [method,setmethod]=useState('stripe')
const [formData,setFormData]=useState({
  firstName:'',
  secondName:'',
  email:'',
  street:'',
  city:'',
  state:'',
  zip:'',
  country:'',
  phone:'',
  location:''
})

const onchangeHandler=(event)=>{
  const name=event.target.name
  const value=event.target.value

  setFormData(data=>({...data,[name]:value}))

}

const onsubmitHandler=async(event)=>{
  event.preventDefault()
  try {
    let orderItems=[] // this will store what user added 

    //the first loop goes throuh each productid

for(const items in cartItem){
  //This loop through sizes inside the product.
for(const item in cartItem[items]){
  if (cartItem[items][item]>0) {
//if items=id of product  like when   items=p1 it finds { _id:"p1", name:"Tshirt", price:20 } then make copy
//items is id id from  shopping cart and product_.id is id from my productList
    const itemsInfo=structuredClone(products.find(product=>product._id===items))
    if (itemsInfo) {
      itemsInfo.size=item
      itemsInfo.quantity=cartItem[items][item]
      orderItems.push(itemsInfo)
    }
  }
}
}
let OrderData={
  address:formData,
  items:orderItems,
  amount:getCartAmount()+delivery_fee
}
switch(method){
  //api call for stripe
  case 'stripe':
    const responce=await axios.post(backendUrl +'/api/order/place',OrderData,{
      headers:localStorage.getItem('token')
    })
    if (responce.data.success) {
      setCartItem({})
      navigate('/orders')
    }else{
      toast.error(responce.data.message)
    }
    break;
    default:
}
console.log(orderItems)
  } catch (error) {
    console.log(error)
  }
}

  return (

    <form onSubmit={onsubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]:'>
      {/* Leftside */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          {/* Delivery imformation */}
          <p>DELIVERY IMFORMATION</p>
        </div>
        <div className='flex gap-3'>
          <input name="firstName" required onChange={onchangeHandler} value={formData.firstName} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='First name' />
          <input name="secondName" onChange={onchangeHandler} value={formData.secondName} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Second name' />
        </div>
        <input name='email' required onChange={onchangeHandler} value={formData.email} type="Email" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Email Adress' />
        <input name='street' required onChange={onchangeHandler} value={formData.street} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Street' />
        <div  className='flex gap-3'>
          <input name='city' required onChange={onchangeHandler} value={formData.city} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='City' />
          <input name='location' required type="text" onChange={onchangeHandler} value={formData.location} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Location' />
        </div>
        <div className='flex gap-3'>
          <input name='zip' required type="text" onChange={onchangeHandler} value={formData.zip} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Zipcode' />
          <input name='country' required type="text" onChange={onchangeHandler} value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='country' />
        </div>
        <input name='phone' required onChangeCapture={onchangeHandler} value={formData.phone} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Phone' />
      </div>
      {/* Right side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <p>PAYMENT METHOD</p>
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full`}></p>
              <img className='h-5 mx-4' src={assets.stripelogo} alt="" />
            </div>
            <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full`}></p>
              <img className='h-5 mx-4' src={assets.rezorpay} alt="" />
            </div>
          </div>

<div className='w-full text-end mt-8'>
<button type='submit'  className='bg-black text-white px-16  py-3 text-sm'>PLACE ORDER</button>
</div>

        </div>
      </div>
    </form>
  )
}

export default PlaceOrders