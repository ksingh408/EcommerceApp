import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = 'http://localhost:5000/api/cart';

// Async thunk to sync cart with backend
export const syncAddToCart = createAsyncThunk(
  "cart/syncAdd",
  async (product, { rejectWithValue }) => {
    try {
      console.log("Product being added to cart:", product);
      const res = await axios.post(
        `${API_URL}/`,
        { productId: product._id, quantity: 1 },
        { withCredentials: true }
      );
      console.log("Cart updated:", res.data.cart); // Debugging log
      return res.data.cart; // Return the updated cart
    } catch (error) {
      console.error("Error adding product to cart:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || "Failed to add product to cart");
    }
  }
);

// Inside your cartSlice.js or wherever you manage cart logic
export const fetchCartData = createAsyncThunk(
  "cart/fetchCartData",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/`, {
        withCredentials: true, // Send cookie to backend
      })
      return res.data.cart; // Assuming backend sends { cart: [...] }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch cart");
    }
  }
);


export const removeFromCartAsync = createAsyncThunk(
  "cart/removeFromCartAsync",
  async (product, { rejectWithValue }) => {
    try {
      console.log(product)
     const productId = product;
      console.log("Product ID to remove:", productId); // Debugging log
      const res = await axios.delete(`${API_URL}/remove/${product}`, {
        withCredentials: true,
      });
      return productId; // Updated cart from backend
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to remove product from cart");
    }
  }
);



const initialState = {
  cartItems: [],
};

const addToCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add product to local cart
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if already in cart
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 }); // Add product with quantity 1
      }
    },

    // Remove product from cart
    // removeFromCart: (state, action) => {
    //   state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
    // },

    // Increase product quantity in cart
    increaseCartQuantity: (state, action) => {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item) item.quantity += 1;  // Increment quantity by 1
    },

    // Decrease product quantity in cart
    decreaseCartQuantity: (state, action) => {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;  // Decrease quantity if more than 1
        } else {
          // Remove item if quantity reaches 0
          state.cartItems = state.cartItems.filter(cartItem => cartItem.id !== action.payload);
        }
      }
    },

    // Clear all items in the cart
    clearCart: (state) => {
      state.cartItems = [];
    },
  },

  extraReducers: (builder) => {
    builder
    // Sync the local cart with the backend cart state
    .addCase(syncAddToCart.fulfilled, (state, action) => {
      state.cartItems = action.payload; // Sync cart after add
    })
    .addCase(fetchCartData.fulfilled, (state, action) => {
      state.cartItems = action.payload.map(item => ({
        ...item.product,          // spread product details (title, price, etc.)
        id: item.product._id ||item.product._id,     // ensure 'id' exists for frontend logic
        quantity: item.quantity,
      })); // Properly close the map function
    })
    .addCase(removeFromCartAsync.fulfilled, (state, action) => {
      const removedId = action.payload;
      state.cartItems = state.cartItems.filter(item => item.id !== removedId);
    });

  }
});

export const { addToCart, removeFromCart, increaseCartQuantity, decreaseCartQuantity, clearCart } = addToCartSlice.actions;
export default addToCartSlice.reducer;


