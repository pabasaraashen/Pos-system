import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    customerName: "",
    customerID: ""
}

const customerSlice = createSlice({
   name : "customer",
   initialState,
   reducers : {
    setCustomer: (state, action) => {
        const{ name, id } = action.payload;
        state.customerName = name;
        state.customerID = id;
    },

    removeCustomer: (state) => {
        state.customerName = "",
        state.customerID = ""
    },

    
   } 
})

export const { setCustomer, removeCustomer } = customerSlice.actions;
export default customerSlice.reducer;