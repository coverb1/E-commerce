import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'

const Verify = () => {
    const { navigate, token, setCartItem, backendUrl } = useContext(shopContext)
    const [searchParams, setSearchParams] = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifypayment = async () => {
        try {

            if (!token) {
                return null
            }
            const responce = await axios.post(backendUrl + '/api/order/verifystripe', { success, orderId }, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            if (responce.data.success) {
                setCartItem({})
                navigate('/order')
                console.log(orderId)
                console.log(success)
            }
            else {
                navigate('/cart')
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        verifypayment()
    }, [token])

    return (
        <div></div>
    )
}

export default Verify