import axios from "axios";
import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";

const Order = ({token}) => {
const backendUrl=import.meta.env.VITE_BACKEND_URL
const[orders,setOrders]=useState([])


const GetallAllOrders=async()=>{
 try {
   const responce=await axios.get(backendUrl + '/api/order/list',{
    headers:{
      token:localStorage.getItem('token')
    }
  })
  if (responce.data.success) {
   console.log(responce.data)
    setOrders(responce.data.orders)
  }
 } catch (error) {
  console.log(error)
 }
}

useEffect(()=>{
GetallAllOrders()
},[token])

  return (
    <div>
      <h3>Order page</h3>
      <div>
        {
          orders.map((order,index)=>(
<div key={index}>
<img src={assets.parcelbox} alt="" />
<div>
  {
    order.items.map((item,index)=>{
if (index===order.items.length -1) {
  return <p key={index}>{item.name} x {item.quantity}<span>{item.size}</span></p>
}
else return  <p key={index}>{item.name} x {item.quantity}<span>{item.size}</span></p>
    })
  }
</div>
</div>
          ))
        }
      </div>
    </div>
  )
}

export default Order