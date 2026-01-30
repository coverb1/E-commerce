import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

export const shopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10
    const [search, setSearch] = useState('')
    const [showSearch, setshowSearch] = useState(true)
    const [cartItem,setCartItem]=useState({})

const addToCart=async(itemId,size)=>{
    if (!size) {
        toast.error('please select Product size')
        return
    }
    let cartData=structuredClone(cartItem)
  if (cartData[itemId]) {
    if (cartData[itemId][size]) {
        cartData[itemId][size]
    }
    else{
        cartData[itemId][size]=1;
    }
  }
  else{
    cartData[itemId]={};
    cartData[itemId][size]=1;
  }
  setCartItem(cartData)
}

// const getCartCount=()=>{
//     let totalcount=0
//     for(items in cartItem){
//         for(item in cartItem[items])
//     }
// }

useEffect(()=>{
console.log(cartItem)
},[cartItem])

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setshowSearch,
        cartItem,addToCart
    }

    return (
        <shopContext.Provider value={value}>
            {props.children}
        </shopContext.Provider>
    )

}
export default ShopContextProvider