import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const shopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10
    const [search, setSearch] = useState('')
    const [showSearch, setshowSearch] = useState(true)
    const [cartItem, setCartItem] = useState({})
    const navigate=useNavigate()

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('please select Product size')
            return
        }
        let cartData = structuredClone(cartItem)
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1 //if product exit add size 
            }
            else {
                cartData[itemId][size] = 1; //if does not exist create 1
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItem(cartData)
    }

    const getCartCount = () => {
        let totalCount = 0
        for (let items in cartItem) {
            for (let item in cartItem[items]) {
                try {
                    if (cartItem[items][item] > 0) {
                        totalCount += cartItem[items][item]
                    }
                } catch (error) {

                }
            }
        }
        return totalCount
    }

    useEffect(() => {
        console.log(cartItem)
    }, [cartItem])

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItem);
        cartData[itemId][size] = quantity;
        setCartItem(cartData)
        console.log(setCartItem)
    }

    const getCartAmount = () => {
        let totalAmount = 0
        for (let items in cartItem) {
            let itemInfo = products.find((product) => product._id === items);
            for (let item in cartItem[items]) {
                try {
                    if (cartItem[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItem[items][item]
                    }
                } catch (error) {

                }
            }
        }
        return totalAmount
    }

    const value = {
        updateQuantity,
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setshowSearch,
        cartItem, addToCart,
        getCartCount,
        getCartAmount,
        navigate
    }

    return (
        <shopContext.Provider value={value}>
            {props.children}
        </shopContext.Provider>
    )

}
export default ShopContextProvider