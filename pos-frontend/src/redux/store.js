import { configureStore } from "@reduxjs/toolkit";
import customerSlice from "./customerSlice";
import cartSlice from "./cartSlice";
import userSlice from "./userSlice"; // Assuming userSlice is imported from userSlice.js

const store = configureStore({
    reducer: {
        customer: customerSlice,
        cart: cartSlice,
        user: userSlice, // Assuming userSlice is imported from userSlice.js
    },

    devTools: import.meta.env.NODE_ENV !== "production",
});

export default store;