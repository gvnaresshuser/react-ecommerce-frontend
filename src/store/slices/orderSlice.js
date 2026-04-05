import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const fetchOrders = createAsyncThunk(
    "orders/fetchOrders",
    async () => {
        const res = await api.get("/orders");
        return res.data;
    }
);

export const fetchOrderById = createAsyncThunk(
    "orders/fetchOrderById",
    async (id) => {
        const res = await api.get(`/orders/${id}`);
        return res.data;
    }
);

export const placeOrder = createAsyncThunk(
    "orders/placeOrder",
    async (data, { rejectWithValue }) => {
        try {
            const res = await api.post("/orders", data);
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Order failed"
            );
        }
    }
);

const orderSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        selectedOrder: null,
        loading: false,
        error: null,
    },

    reducers: {
        clearSelectedOrder: (state) => {
            state.selectedOrder = null;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            //----------------------------------------------
            .addCase(fetchOrderById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedOrder = action.payload;
            })
            .addCase(fetchOrderById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            //----------------------------------------------
            // 🔄 PENDING
            .addCase(placeOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            // ✅ SUCCESS
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders.push(action.payload);
            })

            // ❌ ERROR
            .addCase(placeOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearSelectedOrder } = orderSlice.actions;
export default orderSlice.reducer;