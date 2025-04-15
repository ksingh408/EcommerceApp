import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = 'http://localhost:5000/api/cart';

// Async thunk to sync cart with backend
export const syncAddToCart = createAsyncThunk(
  "cart/syncAdd", // Updated action name to make it clear
  async (product, { getState }) => {
    const { auth } = getState();
    console.log(auth);  // Log user state for debugging (can remove in production)
    console.log(product);  // Log product details for debugging (can remove in production)

    // Send POST request to add product to backend cart
    const res = await axios.post(
      `${API_URL}/`, // Backend API for adding to cart
      { productId: product.id, quantity: 1 },
      { withCredentials: true } // Sends cookies with the request
    );
    console.log(res.data.cart);  // Log backend cart for debugging

    return res.data.cart;  // Return updated cart from backend
  }
);

// Inside your cartSlice.js or wherever you manage cart logic
export const fetchCartData = createAsyncThunk(
  "cart/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/`, {
        withCredentials: true, // Send cookie to backend
      });
      return res.data.cart; // Assuming backend sends { cart: [...] }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch cart");
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
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
    },

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
      state.cartItems = action.payload; // Populate cart on login/page reload
    });
  }
});

export const { addToCart, removeFromCart, increaseCartQuantity, decreaseCartQuantity, clearCart } = addToCartSlice.actions;
export default addToCartSlice.reducer;



// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Async thunk to sync cart with backend
// export const syncAddToCart = createAsyncThunk(
//   "cart/syncAddToCart",
//   async (product, { getState }) => {
//     const { auth } = getState();
//     const res = await axios.post(
//       "/api/cart",
//       { productId: product.id, quantity: 1 },
//       {
//         headers: {
//           Authorization: `Bearer ${auth.token}`,
//         },
//       }
//     );
//     return res.data.cart; // optional: use backend cart if needed
//   }
// );

// const initialState = {
//   cartItems: [],
// };

// const addToCartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const existingItem = state.cartItems.find(item => item.id === action.payload.id);
//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         state.cartItems.push({ ...action.payload, quantity: 1 });
//       }
//     },
//     removeFromCart: (state, action) => {
//       state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
//     },
//     increaseCartQuantity: (state, action) => {
//       const item = state.cartItems.find(item => item.id === action.payload);
//       if (item) item.quantity += 1;
//     },
//     decreaseCartQuantity: (state, action) => {
//       const item = state.cartItems.find(item => item.id === action.payload);
//       if (item) {
//         if (item.quantity > 1) {
//           item.quantity -= 1;
//         } else {
//           state.cartItems = state.cartItems.filter(cartItem => cartItem.id !== action.payload);
//         }
//       }
//     },
//     clearCart: (state) => {
//       state.cartItems = [];
//     },
//   },
//  
// });

// export const {
//   addToCart,
//   removeFromCart,
//   increaseCartQuantity,
//   decreaseCartQuantity,
//   clearCart,
// } = addToCartSlice.actions;

// export default addToCartSlice.reducer;
