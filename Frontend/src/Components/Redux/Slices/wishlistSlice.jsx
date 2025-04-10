import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlistItems: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const existingItem = state.wishlistItems.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;  
      } else {
        state.wishlistItems.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(item => item.id !== action.payload);
    },
    increaseQuantity: (state, action) => {
      const item = state.wishlistItems.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.wishlistItems.find(item => item.id === action.payload);
      if (item && item.quantity > 0) {
        item.quantity -= 1;
      } else {
        state.wishlistItems = state.wishlistItems.filter(item => item.id !== action.payload);
      }
    }
  }
});

export const { addToWishlist, removeFromWishlist, increaseQuantity, decreaseQuantity } = wishlistSlice.actions;
export default wishlistSlice.reducer;

