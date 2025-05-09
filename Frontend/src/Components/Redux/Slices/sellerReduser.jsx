import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL ='http://localhost:5000/api/seller/products';

// Thunks
export const fetchSellerProducts = createAsyncThunk('seller/fetchProducts', async (_, thunkAPI) => {
  try {
    const res = await axios.get(API_URL, { withCredentials: true });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch products');
  }
});

export const createProduct = createAsyncThunk('seller/createProduct', async (data, thunkAPI) => {
  try {
    const res = await axios.post(API_URL, data, { withCredentials: true });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to create product');
  }
});

export const updateProduct = createAsyncThunk('seller/updateProduct', async ({ data, _id }, thunkAPI) => {
  try {
    console.log('Updating product with ID:', _id); // Debugging log
    console.log('Updating product data:', data); // Corrected log
    const res = await axios.put(`${API_URL}/${_id}`, data, { withCredentials: true });
    console.log('Product updated:', res.data); // Debugging log
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update product');
  }
});

export const deleteProduct = createAsyncThunk('seller/deleteProduct', async (id, thunkAPI) => {
  try {
    await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete product');
  }
});

// Slice
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
      // Fetch Products
      .addCase(fetchSellerProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload) ? action.payload.flat() : [];
      })
      .addCase(fetchSellerProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Product
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })

      // Update Product
      .addCase(updateProduct.fulfilled, (state, action) => {
        console.log('Updating product with ID:', action.payload._id);
        const index = state.products.findIndex(p => p._id === action.payload._id);
        if (index !== -1) state.products[index] = action.payload;
      })

      // Delete Product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        console.log('Deleting product with ID:', action.payload);
        state.products = state.products.filter(p => p._id !== action.payload);
      });
  },
});

export default sellerSlice.reducer;








// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_BASE_URL + '/api/seller/products';

// // Thunks
// export const fetchSellerProducts = createAsyncThunk('seller/fetchProducts', async (_, thunkAPI) => {
//   try {
//     const res = await axios.get(API_URL, { withCredentials: true });
//     return res.data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch products');
//   }
// });

// export const createProduct = createAsyncThunk('seller/createProduct', async (data, thunkAPI) => {
//   try {
//     const res = await axios.post(API_URL, data, { withCredentials: true });
//     return res.data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to create product');
//   }
// });

// export const updateProduct = createAsyncThunk('seller/updateProduct', async ({ _id, data }, thunkAPI) => {
//   try {
//     const res = await axios.put(`${API_URL}/${_id}`, data, { withCredentials: true });
//     return res.data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update product');
//   }
// });

// export const deleteProduct = createAsyncThunk('seller/deleteProduct', async (id, thunkAPI) => {
//   try {
//     await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
//     return id;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete product');
//   }
// });

// // Slice
// const sellerSlice = createSlice({
//   name: 'seller',
//   initialState: {
//     products: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Fetch Products
//       .addCase(fetchSellerProducts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchSellerProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.products = Array.isArray(action.payload) ? action.payload.flat() : [];
//       })
//       .addCase(fetchSellerProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Create Product
//       .addCase(createProduct.fulfilled, (state, action) => {
//         state.products.push(action.payload);
//       })

//       // Update Product
//       .addCase(updateProduct.fulfilled, (state, action) => {
//         const index = state.products.findIndex(p => p._id === action.payload._id);
//         if (index !== -1) state.products[index] = action.payload;
//       })

//       // Delete Product
//       .addCase(deleteProduct.fulfilled, (state, action) => {
//         console.log('Deleting product with ID:', action.payload);
//         state.products = state.products.filter(p => p._id !== action.payload);
//       });
//   },
// });

// export default sellerSlice.reducer;




