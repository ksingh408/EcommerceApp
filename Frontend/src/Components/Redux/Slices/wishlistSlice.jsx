import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = 'http://localhost:5000/api/wishlist';

// Async thunk to sync cart with backend
export const syncAddToWishlist = createAsyncThunk(
  "wishlist/syncAdd",
  async (product, { rejectWithValue }) => {
    try {
      console.log("Product being added to wishlist:", product);
      const res = await axios.post(
        `${API_URL}/`,
        { productId: product._id },
        { withCredentials: true }
      );

      console.log("wishlist updated:", res.data.wishlist); // Debugging log

      return res.data.wishlist; // Return the updated cart
    } catch (error) {
      console.error("Error adding product to wishlist:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || "Failed to add product to cart");
    }
  }
);

// Inside your wishlistSlice.js or wherever you manage cart logic
export const getWishlistData = createAsyncThunk(
  "cart/getwishlistData",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/`, {
        withCredentials: true, // Send cookie to backend
      });
      return res.data.wishlist; // Assuming backend sends { cart: [...] }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch cart");
    }
  }
);


const initialState = {
  wishlistItems: [],
};
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const existingItem = state.wishlistItems.find(item => item.id === action.payload.id);
      console.log("Existing Item:", existingItem);
      console.log("Wishlist payload:", action.payload);
      console.log("Wishlist state:", state.wishlistItems);
      if (existingItem) {
        alert("Product already in wishlist"); 
      } else {
        state.wishlistItems.push({ ...action.payload });
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(item => item.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncAddToWishlist.fulfilled, (state, action) => {
        state.wishlistItems = action.payload;
      })
      .addCase(getWishlistData.fulfilled, (state, action) => {
        state.wishlistItems = action.payload
        state.wishlistItems = action.payload.map(item => ({
       ...item.product,
          id: item.product._id, // 👈 normalized ID for frontend
          quantity: item.quantity,
        }));
      });
  }
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

