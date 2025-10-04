import { createContext, useEffect, useState } from "react";
import axios from "axios";


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "https://tomato-foodorder-backend.onrender.com";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);
     const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list"); // check your backend spelling
            setFoodList(response.data.data);
        } catch (err) {
            console.error("Error fetching food list:", err);
        }
    };
    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
            const incoming = response?.data?.cartData ?? {};
            console.log("Cart from backend:", incoming);
            // Ensure we always keep an object so UI controls render
            setCartItems(incoming && typeof incoming === "object" ? incoming : {});
        } catch (err) {
            console.error("Error loading cart data:", err);
            setCartItems({});
        }
    }
    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            const savedToken = localStorage.getItem("token");
            if (savedToken) {
                setToken(savedToken);
                await loadCartData(savedToken);
            } else {
                // Ensure cart is empty when there is no token on startup
                setCartItems({});
            }
        }
        loadData();
    }, []);

    // Whenever token becomes empty (e.g., on logout), clear cartItems defensively
    useEffect(() => {
        if (!token) {
            setCartItems({});
        }
    }, [token]);

    const addTocart = async(itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    };

    const removeFromcart = async(itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    };

    const getTotalcartamount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo && typeof itemInfo.price === "number") {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };
   

    const logout = () => {
        // Client-only clearing: do not hit backend
        setCartItems({});
        setToken("");
        localStorage.removeItem("token");
    };

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addTocart,
        removeFromcart,
        getTotalcartamount,
        url,
        token,
        setToken,
        logout
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
