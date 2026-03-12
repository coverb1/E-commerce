import axios from "axios";
import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";

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
            <div key={index}>
              <img src={assets.parcelbox} alt="" />
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
                        return <p key={index}>{item.name} x {item.quantity}<span>{item.size}</span></p>
                      }
                      else return <p key={index}>{item.name} x {item.quantity}<span>{item.size},</span></p>
                    })
                  }
                </div>
                <p>{order.address.firstName + "" + order.address.secondName}</p>
                <div>
                  <p>{order.address.street + ','}</p>
                  <p> {order.address.country + "," + order.address.location}</p>
                </div>
                <p>{order.address.phone}</p>
              </div>
              <div>
                <p>items:{order.items.length}</p>
                <p>Method:{order.paymentMethod}</p>
                <p>Payment:{order.payment?'Done':'pending'}</p>
                <p>Date : {new Date(order.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default Order