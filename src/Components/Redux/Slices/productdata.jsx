import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch Products from API
export const fetchProducts = createAsyncThunk('products/fetch', async () => {
    const response = await axios.get('http://localhost:5000/api/products');
    
    return response.data;

});

const productSlice = createSlice({
    name: 'products',
    initialState: { items: [], status: 'idle' },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.items = action.payload;
        });
    }
});

export default productSlice.reducer;
