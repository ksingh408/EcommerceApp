

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL + '/api/admin';

// === Thunks ===

// Fetch all users
export const fetchAllUsers = createAsyncThunk('admin/fetchUsers', async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${API_URL}/users`, { withCredentials: true });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message);
  }
});

// Delete a user
export const deleteUserById = createAsyncThunk('admin/deleteUser', async (id, thunkAPI) => {
  try {
    await axios.delete(`${API_URL}/user/${id}`, { withCredentials: true });
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message);
  }
});

// Fetch all products
export const fetchAllProducts = createAsyncThunk('admin/fetchProducts', async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${API_URL}/products`, { withCredentials: true });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message);
  }
});

// Delete a product
export const deleteProductById = createAsyncThunk('admin/deleteProduct', async (id, thunkAPI) => {
  try {
    await axios.delete(`${API_URL}/product/${id}`, { withCredentials: true });
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message);
  }
});


// === Slice ===
const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    users: [],
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // === Users ===
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user._id !== action.payload);
      })

      // === Products ===
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProductById.fulfilled, (state, action) => {
        state.products = state.products.filter(product => product._id !== action.payload);
      });
  },
});

export default adminSlice.reducer;










// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   users: [
// { id: 1, name: "John Doe", email: "john@example.com", role: "User" },
//     { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
//   ],
//   sellers: [
//     { id: 101, name: "Seller A", email: "sellerA@example.com", productCount: 5 },
//     { id: 102, name: "Seller B", email: "sellerB@example.com", productCount: 8 },
//   ],    
// };

// const adminSlice = createSlice({
//   name: "admin",
//   initialState,
//   reducers: {},
// });

// export default adminSlice.reducer;
