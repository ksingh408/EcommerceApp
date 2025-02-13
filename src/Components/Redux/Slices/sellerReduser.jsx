import { createSlice } from "@reduxjs/toolkit";
import products from "../../config.json"
const initialState = {
  sellers: [],
  //products: [],
  currentSeller: null,
};

const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    loginSeller: (state, action) => {
      state.currentSeller = action.payload;
    },
    logoutSeller: (state) => {
      state.currentSeller = null;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) state.products[index] = action.payload;
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
  },
});

export const { loginSeller, logoutSeller, addProduct, updateProduct, deleteProduct } = sellerSlice.actions;
export default sellerSlice.reducer;