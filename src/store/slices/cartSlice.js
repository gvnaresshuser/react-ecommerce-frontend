import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },

    reducers: {
        addToCart: (state, action) => {
            console.log("ACTION PAYLOAD:", action.payload);
            const item = state.items.find(i => i.productId === action.payload.productId);

            if (item) {
                item.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },

        removeFromCart: (state, action) => {
            state.items = state.items.filter(i => i.productId !== action.payload);
        },

        increaseQty: (state, action) => {
            const item = state.items.find(i => i.productId === action.payload);
            if (item) item.quantity += 1;
        },

        decreaseQty: (state, action) => {
            const item = state.items.find(i => i.productId === action.payload);
            if (item && item.quantity > 1) item.quantity -= 1;
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;