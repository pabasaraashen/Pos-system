import { configureStore } from "@reduxjs/toolkit";
import customerSlice from "./customerSlice";
import cartSlice from "./cartSlice";

const store = configureStore({
    reducer: {
        customer: customerSlice,
        cart: cartSlice
    },

    devTools: import.meta.env.NODE_ENV !== "production",
});

export default store;