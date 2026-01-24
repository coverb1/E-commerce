import { createContext } from "react";
import { products } from "../assets/assets";

export const shopContext=createContext();

const ShopContextProvider=(props)=>{
const currency='$';
const delivery_fee=10
const value={
products,
currency
}

return(
    <shopContext.Provider value={value}>
        {props.children}
    </shopContext.Provider>
)

}
export default ShopContextProvider