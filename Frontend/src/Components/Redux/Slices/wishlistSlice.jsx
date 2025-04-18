import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL + '/api/wishlist';

// Async thunk to sync cart with backend
export const syncAddToWishlist = createAsyncThunk(
  "wishlist/syncAdd",
  async (product, { rejectWithValue }) => {
    try {
     
      const res = await axios.post(
        `${API_URL}/`,
        { productId: product._id },
        { withCredentials: true }
      );

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
      console.log("Wishlist data fetched:", res.data); // Debugging log
      return res.data.wishlist; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch cart");
    }
  }
);


export const removeFromWishlistAsync = createAsyncThunk(
  "cart/removeFromWishlistAsync",
  async (product, { rejectWithValue }) => {
    try {
      console.log(product)
     const productId = product;
      console.log("Product ID to remove:", productId); // Debugging log
      const res = await axios.delete(`${API_URL}/remove/${productId}`, {
        withCredentials: true,
      });
      return productId; // Updated cart from backend
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to remove product from cart");
    }
  }
);

const initialState = {
  wishlistItems: [],
};
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  // reducers: {
  //   addToWishlist: (state, action) => {
  //     const existingItem = state.wishlistItems.find(item => item.id === action.payload.id);
     
  //     if (existingItem) {
  //       alert("Product already in wishlist"); 
  //     } else {
  //       state.wishlistItems.push({ ...action.payload });
  //     }
  //   },
  //   removeFromWishlist: (state, action) => {
  //     state.wishlistItems = state.wishlistItems.filter(item => item.id !== action.payload);
  //   }
  // },

  extraReducers: (builder) => {
    builder
      .addCase(syncAddToWishlist.fulfilled, (state, action) => {
     
        state.wishlistItems = action.payload;
      })
      .addCase(getWishlistData.fulfilled, (state, action) => {
        state.wishlistItems = action.payload.map(item => ({
          ...item.product ,       // spread product details (title, price, etc.)
          id: item.product._id,   // ensure 'id' exists for frontend logic
         // quantity: item.quantity,
        })); 
   
           })
           .addCase(removeFromWishlistAsync.fulfilled, (state, action) => {
                 const removedId = action.payload;
                state.wishlistItems = state.wishlistItems.filter(item => item.id !== removedId);
               });
  }
  
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

