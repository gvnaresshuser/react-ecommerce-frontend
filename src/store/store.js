import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import productReducer from "./slices/productSlice";
import authReducer from "./slices/authSlice";
import orderReducer from "./slices/orderSlice";
    
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productReducer,
        auth: authReducer,
        orders: orderReducer,
    },
});