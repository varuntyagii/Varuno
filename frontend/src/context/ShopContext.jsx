import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext';
import axios from 'axios';
import { userDataContext } from './UserContext';
import { toast } from 'sonner';

export const shopDataContext = createContext();
const ShopContext = ({ children }) => {
    let [product, setProduct] = useState([]);
    let { serverUrl } = useContext(authDataContext);
    let { userData } = useContext(userDataContext);
    let [search, setSearch] = useState('');
    let [showSearch, setShowSearch] = useState(false);
    let [cartItem, setCartItem] = useState({})
    const [discount, setDiscount] = useState(0);
    const [wishlist, setWishlist] = useState([]);



    let currency = '₹';
    let delivery_fee = 40;

    const getProduct = async () => {
        try {
            let result = await axios.get(serverUrl + "/api/product/list")
            // console.log(result.data)
            setProduct(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    const addToCart = async (itemId, size) => {
        if (!itemId) {
            console.log("Item ID is missing");
            return;
        }
        if (!size) {
            console.log("Select Product Item");
            return;
        }

        let cartData = structuredClone(cartItem);

        // Initialize object if it doesn't exist
        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }

        // Initialize size if it doesn't exist
        if (!cartData[itemId][size]) {
            cartData[itemId][size] = 0;
        }

        // Increment
        cartData[itemId][size] += 1;

        setCartItem(cartData);

        if (userData) {
            try {
                let result = await axios.post(
                    serverUrl + '/api/cart/add',
                    { itemId, size },
                    { withCredentials: true }
                );

                console.log(result.data);
                toast.success("Item added to cart!");

            } catch (error) {
                console.log(error);
                toast.error("Failed to add item!");

            }
        }
    }

    const getUserCart = async () => {
        try {
            const result = await axios.post(serverUrl + '/api/cart/get', {}, { withCredentials: true })
            setCartItem(result.data || {});
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }


    // const updateQuantity = async(itemId, size, quantity)=>{

    //         let cartData = structuredClone(cartItem);
    //         cartData[itemId][size] = quantity;

    //         if(userData){
    //             try {
    //                 await axios.post(serverUrl + '/api/cart/update', {
    //                     itemId, size, quantity
    //                 }, {withCredentials:true})
    //             } catch (error) {
    //                 toast.error(error.message);
    //             }
    //         }
    //     } 


    // // ShopContext.js
    // const getCartCount = () => {
    //   if (!userData?.cartData) return 0;
    //   let count = 0;
    //   for (const prodId in cartItem) {
    //     for (const size in cartItem[prodId]) {
    //       count += cartItem[prodId][size];
    //     }
    //   }
    //   return count;
    // };


    // instant update cart
    const updateQuantity = async (itemId, size, quantity) => {
        // 1. Local cart update
        setCartItem(prev => {
            const newCart = structuredClone(prev);
            if (!newCart[itemId]) newCart[itemId] = {};
            newCart[itemId][size] = quantity;
            return newCart;
        });

        // 2. Server ko async update
        if (userData) {
            try {
                await axios.post(serverUrl + "/api/cart/update", { itemId, size, quantity }, { withCredentials: true });
            } catch (err) {
                console.log(err);
            }
        }
    };

    // getCartCount() updated
    const getCartCount = () => {
        let count = 0;
        for (const prodId in cartItem) {
            for (const size in cartItem[prodId]) {
                count += cartItem[prodId][size];
            }
        }
        return count;
    };

    const getCartAmount = () => {
        let amount = 0;

        for (const itemId in cartItem) {
            let info = product.find(p => p._id === itemId);
            if (!info) continue;  // agar product nahi mila to skip

            for (const size in cartItem[itemId]) {
                let quantity = cartItem[itemId][size];
                if (quantity > 0) {
                    amount += info.price * quantity;
                }
            }
        }

        return amount;
    }
    // 2. Toggle function add karo
const toggleWishlist = (product) => {
  setWishlist(prev =>
    prev.find(item => item._id === product._id)
      ? prev.filter(item => item._id !== product._id)  // remove
      : [...prev, product]                              // add
  );
};

    useEffect(() => {
        getProduct();
    }, [])
    useEffect(() => {
          if (userData) {
        getUserCart();
    }
    }, [])

    let value = {
        product, currency, delivery_fee, getProduct, search, setSearch, showSearch, setShowSearch, addToCart, getCartCount, cartItem, setCartItem, updateQuantity, getCartAmount, discount, 
  setDiscount,   wishlist, toggleWishlist

    }
    return (
        <div>
            <shopDataContext.Provider value={value}>
                {children}
            </shopDataContext.Provider>
        </div>
    )

}
export default ShopContext
