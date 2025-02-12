import { createSlice } from "@reduxjs/toolkit";
// import products from "../config.json"

const initialState = {
  products: [],
};
const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.name !== action.payload.name
      );
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.name === action.payload.name
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
  },
});

export const { addProduct, removeProduct, updateProduct } = sellerSlice.actions;
export default sellerSlice.reducer;
