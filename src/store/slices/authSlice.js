import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// 🔥 Get logged-in user
export const fetchProfile = createAsyncThunk(
    "auth/profile",
    async () => {
        //const res = await api.get("/auth/profile");
        const res = await api.get("/auth/me");
        return res.data;
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isAuth: false,
        role: null,
        loading: false,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuth = false;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuth = true;
                state.role = action.payload.role; // 🔥 store role
            })
            .addCase(fetchProfile.rejected, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuth = false;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;