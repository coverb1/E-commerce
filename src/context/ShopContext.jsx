import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const shopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setshowSearch] = useState(true);

    // Initialize cart from localStorage
    const [cartItem, setCartItem] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : {};
    });

    const navigate = useNavigate();
    const [products, setproducts] = useState([]);
    const [token, setToken] = useState('');

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('please select Product size');
            return;
        }
        let cartData = structuredClone(cartItem);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItem(cartData);

        if (token) {
            try {
                const responce = await axios.post(
                    backendUrl + '/api/cart/add',
                    { itemId, size },
                    { headers: { token: localStorage.getItem('token') } }
                );
                console.log(responce, "token is available");
                setCartItem(responce.data.cartData);
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    //  Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItem));
    }, [cartItem]);

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token]);

    const getCartCount = () => {
        let totalCount = 0;
        for (let items in cartItem) {
            for (let item in cartItem[items]) {
                try {
                    if (cartItem[items][item] > 0) {
                        totalCount += cartItem[items][item];
                    }
                } catch (error) {}
            }
        }
        return totalCount;
    };

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItem);
        cartData[itemId][size] = quantity;
        setCartItem(cartData);
        console.log(setCartItem);
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (let items in cartItem) {
            let itemInfo = products.find((product) => product._id === items);
            for (let item in cartItem[items]) {
                try {
                    if (cartItem[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItem[items][item];
                    }
                } catch (error) {}
            }
        }
        return totalAmount;
    };

    const getProductData = async () => {
        try {
            const responce = await axios.get(backendUrl + '/api/products/list');
            console.log(responce);
            if (responce.data.success) {
                setproducts(responce.data.allProducts);
            } else {
                toast.error(responce.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getProductData();
    }, []);

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
        }
    }, []);

    const value = {
        updateQuantity,
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setshowSearch,
        cartItem,
        addToCart,
        getCartCount,
        getCartAmount,
        navigate,
        backendUrl,
        token,
        setToken,
        setCartItem,
    };

    return (
        <shopContext.Provider value={value}>
            {props.children}
        </shopContext.Provider>
    );
};

export default ShopContextProvider;