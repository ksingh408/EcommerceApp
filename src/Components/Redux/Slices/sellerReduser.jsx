import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunks
export const fetchSellerProducts = createAsyncThunk("seller/fetchProducts", async (sellerId) => {
  const response = await axios.get(`/api/sellers/${sellerId}/products`);
  return response.data;
});

export const addProduct = createAsyncThunk("seller/addProduct", async (product) => {
  const response = await axios.post("/api/products", product);
  return response.data;
});

export const updateProduct = createAsyncThunk("seller/updateProduct", async (product) => {
  const response = await axios.put(`/api/products/${product.id}`, product);
  return response.data;
});

export const deleteProduct = createAsyncThunk("seller/deleteProduct", async (productId) => {
  await axios.delete(`/api/products/${productId}`);
  return productId;
});

// Initial State
const initialState = {
  products: [],
  currentSeller: null,
  status: "idle", //"idle" | "loading" | "succeeded" | "failed"
  error: null,
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
      state.products = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSellerProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchSellerProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.products[index] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p.id !== action.payload);
      });
  },
});

export const { loginSeller, logoutSeller } = sellerSlice.actions;
export default sellerSlice.reducer;
