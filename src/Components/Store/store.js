import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './Slices/addtoCart.jsx';
import wishlistReducer from './Slices/wishlistSlice.jsx';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    
  },
});

export default store;
