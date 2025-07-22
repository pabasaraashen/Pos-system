
import { configureStore } from "@reduxjs/toolkit";
import customerSlice from "./customerSlice";
import cartSlice from "./cartSlice";
import userSlice from "./userSlice";

// Load user from localStorage if available
const persistedUser = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : {
      _id: "",
      name: "",
      email: "",
      phone: "",
      role: "",
      isAuth: false,
    };


const store = configureStore({
  reducer: {
    customer: customerSlice,
    cart: cartSlice,
    user: userSlice,
  },
  preloadedState: {
    user: persistedUser,
  },
  devTools: import.meta.env.NODE_ENV !== "production",
});

// Subscribe to store changes and persist user state
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('user', JSON.stringify(state.user));
});

export default store;