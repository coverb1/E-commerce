import axios from "axios";
import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { currency } from "../App";

const Order = ({ token }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [orders, setOrders] = useState([])


  const GetallAllOrders = async () => {
    try {
      const responce = await axios.get(backendUrl + '/api/order/list', {
        headers: {
          token: localStorage.getItem('token')
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

  useEffect(() => {
    GetallAllOrders()
  }, [token])

  return (
    <div>
      <h3>Order page</h3>
      <div>
        {/*  here we are going inside the whole order  containing many orders  */}
        {
          orders.map((order, index) => (
            <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start
            border-2 border-gray-200 p-5 md:p-8 my-3 md-my-4 text-xs sm:text-sm text-gray-700" key={index}>
              <img className="w-12" src={assets.parcelbox} alt="" />
              <div>
                <div>
                  {
                    // here  orders  is the array of many orders means many customer make many orders like box contains many boxes
                    // so order is one order inside many orders the second map goes through each order one by one 
                    order.items.map((item, index) => {
                      // and here we are checking if the item is at the last index we do not add comma and if   yes we add comma
                      // index we know starts from 0 ,1,2,3.... and .length we suppose that it is 3  we are checking if
                      // 2===3-1 
                      if (index === order.items.length - 1) {
                        return <p className="py-0.5" key={index}>{item.name} x {item.quantity}<span>{item.size}</span></p>
                      }
                      else return <p className="py-0.5" key={index}>{item.name} x {item.quantity}<span>{item.size},</span></p>
                    })
                  }
                </div>
                <p className="mt-3 mb-2 font-medium">{order.address.firstName + "" + order.address.secondName}</p>
                <div>
                  <p>{order.address.street + ','}</p>
                  <p> {order.address.country + "," + order.address.location}</p>
                </div>
                <p>{order.address.phone}</p>
              </div>
              <div>
                <p className="text-sm sm:text-[15px]">items: {order.items.length}</p>
                <p className="mt-3">Method: {order.paymentMethod}</p>
                <p>Payment: {order.payment?'Done':'pending'}</p>
                <p>Date : {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className="text-sm sm:text-[15px]">{currency}: {order.amount}</p>
              <select className="p-2 font-semibold">
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default Order