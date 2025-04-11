
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/seller/products';

export const fetchSellerProducts = createAsyncThunk('seller/produc', async (_, thunkAPI) => {
  try {
    
    const res = await axios.get(API_URL, { withCredentials: true });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message);
  }
});

export const createProduct = createAsyncThunk('seller/products', async (data, thunkAPI) => {
  try {
    const res = await axios.post(API_URL, data, { withCredentials: true });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message);
  }
});

export const updateProduct = createAsyncThunk('seller/updateProduct', async ({ id, data }, thunkAPI) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, data, { withCredentials: true });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message);
  }
});

export const deleteProduct = createAsyncThunk('seller/deleteProduct', async (id, thunkAPI) => {
  try {
    await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message);
  }
});

const sellerSlice = createSlice({
  name: 'seller',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(p => p._id === action.payload._id);
        if (index !== -1) state.products[index] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(p => p._id !== action.payload);
      });
  },
});

export default sellerSlice.reducer;







// import { createSlice } from "@reduxjs/toolkit";
// //import productData from "../../JsonData/config.json"
// const initialState = {
//   // sellers: [],
  
//   products:[],
//   currentSeller: null,
// };

// // console.log(product);


// const sellerSlice = createSlice({
//   name: "seller",
//   initialState,
//   reducers: {
//     loginSeller: (state, action) => {
//       state.currentSeller = action.payload;
//     },
//     logoutSeller: (state) => {
//       state.currentSeller = null;
//     },
//     addProduct: (state, action) => {
//       const newProduct = action.payload
//       state.products.push({...newProduct, id: Date.now()});
//     },
//     updateProduct: (state, action) => {
//       const index = state.products.findIndex(p => p.id === action.payload.id);
//       if (index !== -1) state.products[index] = action.payload;
//     },
//     deleteProduct: (state, action) => {
//       state.products = state.products.filter(p => p.id !== action.payload);
//     },
//   },
// });

// export const { loginSeller, logoutSeller, addProduct, updateProduct, deleteProduct } = sellerSlice.actions;
// export default sellerSlice.reducer;